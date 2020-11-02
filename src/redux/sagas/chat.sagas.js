import { call, put, takeEvery } from "redux-saga/effects";
import { ChatCreators, ChatTypes } from "../actions";
import { getCurrentChat, getChatUser, sendMsg, readMsg } from "@redux/api";
import moment from "moment";
import EventBus from "eventing-bus";

export function* watchChatRequests() {
  yield takeEvery(ChatTypes.REQUEST_GET_CURRENT_CHAT, requestCurrentChat);

  yield takeEvery(ChatTypes.REQUEST_SEND_MSG, requestSendMsg);
  yield takeEvery(ChatTypes.REQUEST_READ_MSG, requestReadMsg);
}

function* requestCurrentChat(action) {
  try {
    const { chatId, chatUserId, token } = action;

    if (chatId === undefined) {
      let params = new FormData();
      params.append("user_target_id", chatUserId);
      let response = yield call(getChatUser, params, token);

      let chat_id = response.data.data.chat_id;
      if (chat_id === null) {
        yield put(ChatCreators.getCurrentChatSuccess([]));
      } else {
        EventBus.publish("NEW_CHAT_ID", chat_id);

        params = new FormData();
        params.append("chat_id", chat_id);
        response = yield call(getCurrentChat, params, token);

        let result = [];
        response.data.data.messages.forEach(message => {
          message.createdAt = moment.unix(message.createdAt).toDate();
          if (message.user === 0) {
            message.user = {
              _id: 0,
              name: "Pluzo Team",
              avatar: require("@assets/images/app-icon.png"),
            };
          }
          result.push(message);
        });

        yield put(ChatCreators.getCurrentChatSuccess(response.data.data.messages));
      }
    } else {
      const params = new FormData();
      params.append("chat_id", chatId);
      const response = yield call(getCurrentChat, params, token);

      let result = [];
      response.data.data.messages.forEach(message => {
        result.push({
          _id: message._id,
          text: message.text,
          image: message.image,
          createdAt: moment.unix(message.createdAt).toDate(),
          user: {
            _id: message.user === 0 ? 0 : message.user._id || message.user.id,
            name:
              message.user === 0
                ? "Pluzo Team"
                : message.user.name || message.user.username,
            avatar:
              message.user === 0
                ? require("@assets/images/app-icon.png")
                : message.user.images[0].path,
          },
        });
      });

      yield put(ChatCreators.getCurrentChatSuccess(result));
    }
  } catch (error) {
    yield put(ChatCreators.getCurrentChatFailure());
  }
}

function* requestSendMsg(action) {
  try {
    const { params, token } = action;

    const requestParams = new FormData();
    if (params.text !== null && params.text !== "") {
      requestParams.append("text", params.text);
    }
    requestParams.append("send_to", params.sendTo);
    if (params.chatId !== null) {
      requestParams.append("chat_id", params.chatId);
    }
    if (params.image !== null) {
      requestParams.append("image", params.image);
    }

    const response = yield call(sendMsg, requestParams, token);

    if (params.chatId === null) {
      let messages = response.data.data;
      EventBus.publish("NEW_CHAT_ID", messages[0].chat_id);
    }
  } catch (error) {
    console.log("send message >>", error);
  }
}

function* requestReadMsg(action) {
  try {
    const { params, token } = action;

    const requestParams = new FormData();
    params.forEach(msgId => {
      requestParams.append("message_id[]", msgId);
    });
    yield call(readMsg, requestParams, token);
  } catch (error) {
    console.log("send message >>", error);
  }
}

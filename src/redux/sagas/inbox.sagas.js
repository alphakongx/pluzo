import { call, put, takeEvery } from "redux-saga/effects";
import { InboxCreators, InboxTypes } from "../actions";
import {
  getChat,
  getFriends,
  acceptFriend,
  rejectFriend,
  addFriendByUsername,
  getPendingRequests,
} from "@redux/api";

export function* watchInboxRequests() {
  yield takeEvery(InboxTypes.REQUEST_CHANNELS, requestChannels);

  yield takeEvery(InboxTypes.REQUEST_ADD_FRIEND, requestAddFriend);
  yield takeEvery(InboxTypes.REQUEST_ACCEPT_FRIEND, requestAcceptFriend);
  yield takeEvery(InboxTypes.REQUEST_REJECT_FRIEND, requestRejectFriend);
  yield takeEvery(InboxTypes.REQUEST_PENDING_FRIENDS, requestPendingFriends);
  yield takeEvery(InboxTypes.REQUEST_FRIENDS, requestFriends);
}

function* requestChannels(action) {
  try {
    const { token } = action;
    const response = yield call(getChat, token);

    console.log(response);

    yield put(InboxCreators.loadChannelsDone());
  } catch (error) {
    yield put(InboxCreators.loadChannelsDone());
  }
}

/** Friends */
function* requestAddFriend(action) {
  try {
    const { username, token } = action;
    const params = new FormData();
    params.append("username", username);
    console.log("ADD FRIEND:", username);
    yield call(addFriendByUsername, params, token);

    yield put(InboxCreators.addFriendSuccess());
  } catch (error) {
    console.log(error);
    yield put(InboxCreators.addFriendFailure());
  }
}

function* requestAcceptFriend(action) {
  try {
    const { user_id, token } = action;
    const params = new FormData();
    params.append("user_target_id", user_id);
    yield call(acceptFriend, params, token);

    yield put(InboxCreators.acceptFriendSuccess());
  } catch (error) {
    yield put(InboxCreators.acceptFriendFailure());
  }
}

function* requestRejectFriend(action) {
  try {
    const { user_id, token } = action;
    const params = new FormData();
    params.append("user_target_id", user_id);
    yield call(rejectFriend, params, token);

    yield put(InboxCreators.rejectFriendSuccess());
  } catch (error) {
    yield put(InboxCreators.rejectFriendFailure());
  }
}

function* requestPendingFriends(action) {
  try {
    const { token } = action;
    
    const response = yield call(getPendingRequests, token);
    yield put(InboxCreators.pendingFriendsSuccess(response.data.data));
  } catch (error) {
    yield put(InboxCreators.pendingFriendsFailure());
  }
}

function* requestFriends(action) {
  try {
    const { token } = action;
    
    const response = yield call(getFriends, token);
    yield put(InboxCreators.requestFriendsSuccess(response.data.data));
  } catch (error) {
    yield put(InboxCreators.requestFriendsFailure());
  }
}
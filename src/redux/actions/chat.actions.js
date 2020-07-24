import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  // requestGetChatMsg: ["limit", "token"],
  // getChatMsgSuccess: null,
  // getChatMsgFailure: null,

  requestGetCurrentChat: ["chartId", "chatUserId", "token"],
  getCurrentChatSuccess: ["messages"],
  getCurrentChatFailure: null,

  updateCurrentMsg: ["messages"],

  requestSendMsg: ["params", "token"],

  // requestSendMsg:
});

export const ChatTypes = Types;
export const ChatCreators = Creators;

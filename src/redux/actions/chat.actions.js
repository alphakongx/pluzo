import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  requestGetCurrentChat: ["chartId", "chatUserId", "token"],
  getCurrentChatSuccess: ["messages"],
  getCurrentChatFailure: null,

  updateCurrentMsg: ["messages"],

  requestSendMsg: ["params", "token"],

  requestReadMsg: ["params", "token"],
});

export const ChatTypes = Types;
export const ChatCreators = Creators;

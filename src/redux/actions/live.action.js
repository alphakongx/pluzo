import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  setSortBy: ["sortBy"],
  setFilterCountry: ["country"],

  setStreamStatus: ["streamStatus"],
  setIsScrolling: ["isScrolling"],
  setAskedToJoin: ["askedJoin"],

  /// camera setting
  setEnabledCamera: ["enabled"],
  setEnabledMic: ["enabled"],
  resetEnabledSettings: null,

  requestStreamUpdate: ["params", "token"],
  streamUpdateSuccess: ["data"],

  /// start strem
  requestStreamStart: ["params", "token"],
  requestStreamStop: ["params", "token"],
  requestStreamJoin: ["channel_id", "token"],
  requestStreamLeave: ["channel_id", "token"],
  requestStreamUserType: ["channel_id", "user_id", "user_type", "token"],

  /// sending or accepting broad requests
  requestStreamAskJoin: ["channel_id", "user_id", "token"],
  requestStreamAcceptJoin: ["channel_id", "user_id", "token"],
  requestStreamRefusedJoin: ["channel_id", "user_id", "token"],
  requestStreamDisconnectBroad: ["channel_id", "user_id", "token"],
  requestUserAskJoin: ["channel_id", "token"],
  requestUserAcceptJoin: ["channel_id", "user_id", "token"],
  requestUserRefusedJoin: ["channel_id", "user_id", "token"],
  requestUserCancelAsk: ["channel_id", "token"],

  requestStreamList: ["token"],
  streamListSuccess: ["data"],

  requestStreamUserList: ["channel_id", "token"],
  streamUserListSuccess: ["data"],
  updateAudiences: ["data"],
  updateBroadcasters: ["data"],

  updateMessages: ["messages"],
  requestStreamChatAddMsg: ["channel_id", "message", "token"],
});

export const LiveTypes = Types;
export const LiveCreators = Creators;

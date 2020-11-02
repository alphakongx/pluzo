import { createReducer } from "reduxsauce";
import { LiveTypes, UserTypes } from "../actions";
import storeInitialState from "../store/initial-state";
export const INITIAL_STATE = storeInitialState.live;

const logout = (state, action) => INITIAL_STATE;

const setSortBy = (state, action) => ({
  ...state,
  sortBy: action.sortBy,
});

const setFilterCountry = (state, action) => ({
  ...state,
  filterCountry: action.country,
});

const setEnabledCamera = (state, action) => ({
  ...state,
  isEnabledCamera: action.enabled,
});
const setEnabledMic = (state, action) => ({
  ...state,
  isEnabledMic: action.enabled,
});
const resetEnabledSettings = (state, action) => ({
  ...state,
  isEnabledCamera: true,
  isEnabledMic: true,
});

const setStreamStatus = (state, action) => ({
  ...state,
  streamStatus: action.streamStatus,
});
const setIsScrolling = (state, action) => ({
  ...state,
  isScrolling: action.isScrolling,
});
const setAskedToJoin = (state, action) => ({
  ...state,
  isAskedToJoin: action.askedJoin,
});

const requestStreamUpdate = (state, action) => ({
  ...state,
});
const streamUpdateSuccess = (state, action) => ({
  ...state,
  stream: action.data,
});

const requestStreamStart = (state, action) => ({
  ...state,
});
const requestStreamStop = (state, action) => ({
  ...state,
});
const requestStreamJoin = (state, action) => ({
  ...state,
});
const requestStreamLeave = (state, action) => ({
  ...state,
});
const requestStreamUserType = (state, action) => ({
  ...state,
});
const requestStreamAskJoin = (state, action) => ({
  ...state,
});
const requestStreamAcceptJoin = (state, action) => ({
  ...state,
});
const requestStreamRefusedJoin = (state, action) => ({
  ...state,
});
const requestStreamDisconnectBroad = (state, action) => ({
  ...state,
});
const reqeustUserAskJoin = (state, action) => ({
  ...state,
});
const requestUserAcceptJoin = (state, action) => ({
  ...state,
});
const requestUserRefusedJoin = (state, action) => ({
  ...state,
});
const reqeustUserCancelAsk = (state, action) => ({
  ...state,
});

const requestStreamList = (state, action) => ({
  ...state,
});
const streamListSuccess = (state, action) => ({
  ...state,
  allStreams: action.data.all_stream,
  trendingStreams: action.data.trending_list,
  friendStreams: action.data.friends_stream,
});

const requestStreamUserList = (state, action) => ({
  ...state,
});
const streamUserListSuccess = (state, action) => ({
  ...state,
  broadcasters: action.data.broadcasters,
  audiences: action.data.audience,
});
const updateBroadcasters = (state, action) => ({
  ...state,
  broadcasters: action.data,
});
const updateAudiences = (state, action) => ({
  ...state,
  audiences: action.data,
});

const updateMessages = (state, action) => ({
  ...state,
  messages: action.messages,
});
const requestStreamChatAddMsg = (state, action) => ({
  ...state,
});

export const HANDLERS = {
  [LiveTypes.SET_SORT_BY]: setSortBy,
  [LiveTypes.SET_FILTER_COUNTRY]: setFilterCountry,

  [LiveTypes.SET_ENABLED_CAMERA]: setEnabledCamera,
  [LiveTypes.SET_ENABLED_MIC]: setEnabledMic,
  [LiveTypes.RESET_ENABLED_SETTINGS]: resetEnabledSettings,

  [LiveTypes.SET_STREAM_STATUS]: setStreamStatus,
  [LiveTypes.SET_IS_SCROLLING]: setIsScrolling,
  [LiveTypes.SET_ASKED_TO_JOIN]: setAskedToJoin,

  [LiveTypes.REQUEST_STREAM_UPDATE]: requestStreamUpdate,
  [LiveTypes.STREAM_UPDATE_SUCCESS]: streamUpdateSuccess,

  [LiveTypes.REQUEST_STREAM_START]: requestStreamStart,
  [LiveTypes.REQUEST_STREAM_STOP]: requestStreamStop,
  [LiveTypes.REQUEST_STREAM_JOIN]: requestStreamJoin,
  [LiveTypes.REQUEST_STREAM_LEAVE]: requestStreamLeave,
  [LiveTypes.REQUEST_STREAM_USER_TYPE]: requestStreamUserType,

  [LiveTypes.REQUEST_STREAM_ASK_JOIN]: requestStreamAskJoin,
  [LiveTypes.REQUEST_STREAM_ACCEPT_JOIN]: requestStreamAcceptJoin,
  [LiveTypes.REQUEST_STREAM_REFUSED_JOIN]: requestStreamRefusedJoin,
  [LiveTypes.REQUEST_STREAM_DISCONNECT_BROAD]: requestStreamDisconnectBroad,

  [LiveTypes.REQUEST_USER_ASK_JOIN]: reqeustUserAskJoin,
  [LiveTypes.REQUEST_USER_ACCEPT_JOIN]: requestUserAcceptJoin,
  [LiveTypes.REQUEST_USER_REFUSED_JOIN]: requestUserRefusedJoin,
  [LiveTypes.REQUEST_USER_CANCEL_ASK]: reqeustUserCancelAsk,

  [LiveTypes.REQUEST_STREAM_LIST]: requestStreamList,
  [LiveTypes.STREAM_LIST_SUCCESS]: streamListSuccess,

  [LiveTypes.REQUEST_STREAM_USER_LIST]: requestStreamUserList,
  [LiveTypes.STREAM_USER_LIST_SUCCESS]: streamUserListSuccess,
  [LiveTypes.UPDATE_BROADCASTERS]: updateBroadcasters,
  [LiveTypes.UPDATE_AUDIENCES]: updateAudiences,

  [LiveTypes.UPDATE_MESSAGES]: updateMessages,
  [LiveTypes.REQUEST_STREAM_CHAT_ADD_MSG]: requestStreamChatAddMsg,

  [UserTypes.LOGOUT]: logout,
};

export default createReducer(INITIAL_STATE, HANDLERS);

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

const setStreamStatus = (state, action) => ({
  ...state,
  streamStatus: action.streamStatus,
});

const setIsScrolling = (state, action) => ({
  ...state,
  isScrolling: action.isScrolling,
});

const requestStreamStart = (state, action) => ({
  ...state,
});
const requestStreamStop = (state, action) => ({
  ...state,
});
const requestStreamList = (state, action) => ({
  ...state,
});
const streamListSuccess = (state, action) => ({
  ...state,
  allStreams: action.data.all_stream,
  friendStreams: action.data.friends_stream,
});
const requestStreamUserList = (state, action) => ({
  ...state,
});
const streamUserListSuccess = (state, action) => ({
  ...state,
  currentStream: action.data,
});

export const HANDLERS = {
  [LiveTypes.SET_SORT_BY]: setSortBy,
  [LiveTypes.SET_FILTER_COUNTRY]: setFilterCountry,

  [LiveTypes.SET_STREAM_STATUS]: setStreamStatus,
  [LiveTypes.SET_IS_SCROLLING]: setIsScrolling,

  [LiveTypes.REQUEST_STREAM_START]: requestStreamStart,
  [LiveTypes.REQUEST_STREAM_STOP]: requestStreamStop,
  [LiveTypes.REQUEST_STREAM_LIST]: requestStreamList,
  [LiveTypes.STREAM_LIST_SUCCESS]: streamListSuccess,

  [LiveTypes.REQUEST_STREAM_USER_LIST]: requestStreamUserList,
  [LiveTypes.STREAM_USER_LIST_SUCCESS]: streamUserListSuccess,

  [UserTypes.LOGOUT]: logout,
};

export default createReducer(INITIAL_STATE, HANDLERS);

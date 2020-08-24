import { call, put, takeLatest } from "redux-saga/effects";
import { LiveCreators, LiveTypes } from "../actions";
import { streamStart, streamStop, streamList, streamUserList } from "@redux/api";

export function* watchLiveRequests() {
  yield takeLatest(LiveTypes.REQUEST_STREAM_START, requestStreamStart);
  yield takeLatest(LiveTypes.REQUEST_STREAM_STOP, requestStreamStop);
  yield takeLatest(LiveTypes.REQUEST_STREAM_LIST, requestStreamList);
  yield takeLatest(LiveTypes.REQUEST_STREAM_USER_LIST, requestStreamUserList);
}

function* requestStreamStart(action) {
  try {
    const { params, token } = action;
    const requestParams = new FormData();
    requestParams.append("channel_id", params.channel_id);
    requestParams.append("category", params.category);
    requestParams.append("name", params.name);

    yield call(streamStart, requestParams, token);
  } catch (error) {
    console.log("stream start >>>", error);
  }
}

function* requestStreamStop(action) {
  try {
    const { params, token } = action;
    const requestParams = new FormData();
    requestParams.append("channel_id", params.channel_id);

    yield call(streamStop, requestParams, token);
  } catch (error) {
    console.log("stream stop >>>", error);
  }
}

function* requestStreamList(action) {
  try {
    const { token } = action;

    const response = yield call(streamList, null, token);

    console.log("stream list >>>", response.data.data);
    yield put(LiveCreators.streamListSuccess(response.data.data));
  } catch (error) {
    console.log("stream list >>>", error);
  }
}

function* requestStreamUserList(action) {
  try {
    const { channel_id, token } = action;
    const requestParams = new FormData();
    requestParams.append("channel_id", channel_id);
    const response = yield call(streamUserList, requestParams, token);

    console.log("stream user list >>>", response.data.data);
    yield put(LiveCreators.streamUserListSuccess(response.data.data));
  } catch (error) {
    console.log("stream list >>>", error);
  }
}

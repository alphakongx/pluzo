import { call, put, takeEvery } from "redux-saga/effects";
import { InboxCreators, InboxTypes } from "../actions";
import { getChat } from "@redux/api";

export function* watchInboxRequests() {
  yield takeEvery(InboxTypes.REQUEST_CHANNELS, requestChannels);
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

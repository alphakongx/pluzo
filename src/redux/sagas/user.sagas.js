import { takeEvery } from "redux-saga/effects";
import { UserTypes } from "../actions";

export function* watchUserRequests() {
  yield takeEvery(UserTypes.REQUEST_LOGIN, requestLogin);
}

function* requestLogin(action) {
  try {
  } catch (error) {}
}

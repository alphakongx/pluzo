import { call, put, takeEvery } from "redux-saga/effects";
import { UserCreators, UserTypes } from "../actions";
import { login } from "@redux/api";

export function* watchUserRequests() {
  yield takeEvery(UserTypes.REQUEST_LOGIN, requestLogin);
}

function* requestLogin(action) {
  try {
    const response = yield call(login);

    yield put(UserCreators.loginSuccess(response.data));
  } catch (error) {
    yield put(UserCreators.loginFailure());
  }
}

import { call, put, takeEvery, select } from "redux-saga/effects";
import { UserCreators, UserTypes } from "../actions";
import {
  login,
  register,
  phoneVerificationSendCode,
  phoneVerificationConfirmCode,
} from "@redux/api";
import { registrationSelector } from "../selectors";
import { Notification } from "@helpers";

export function* watchUserRequests() {
  yield takeEvery(UserTypes.REQUEST_LOGIN, requestLogin);
  yield takeEvery(UserTypes.REQUEST_REGISTRATION, requestRegistration);
  yield takeEvery(
    UserTypes.REQUEST_PHONE_VERIFICATION_SEND_CODE,
    requestPhoneVerificationSendCode,
  );
  yield takeEvery(
    UserTypes.REQUEST_PHONE_VERIFICATION_CONFIRM_CODE,
    requestPhoneVerificationConfirmCode,
  );
}

function* requestLogin(action) {
  try {
    const { params } = action;
    const requestParams = new FormData();
    requestParams.append("username", params.username);
    requestParams.append("password", params.password);
    const response = yield call(login, requestParams);

    Notification.alert("Login Success");

    yield put(UserCreators.loginSuccess(response.data.data));
  } catch (error) {
    yield put(UserCreators.loginFailure());
  }
}

function* requestRegistration(action) {
  try {
    const registrationData = yield select(registrationSelector);
    const params = new FormData();

    params.append("first_name", registrationData.firstName);
    params.append("dob", registrationData.birthDate);
    params.append("gender", registrationData.gender);
    params.append("username", registrationData.username);
    params.append("password", registrationData.password);
    params.append("phone", registrationData.phoneNumber);
    params.append("image", registrationData.picture);

    const response = yield call(register, params);

    yield put(UserCreators.registrationSuccess(response.data.data));
  } catch (error) {
    yield put(UserCreators.registrationFailure());
  }
}

function* requestPhoneVerificationSendCode(action) {
  try {
    const { phoneNumber } = yield select(registrationSelector);
    const params = new FormData();

    params.append("phone", phoneNumber);

    yield call(phoneVerificationSendCode, params);

    yield put(UserCreators.phoneVerificationSendCodeSuccess());
  } catch (error) {
    yield put(UserCreators.phoneVerificationSendCodeFailure());
  }
}

function* requestPhoneVerificationConfirmCode(action) {
  try {
    const { phoneNumber } = yield select(registrationSelector);
    const { code } = action;
    const params = new FormData();

    params.append("phone", phoneNumber);
    params.append("code", code);

    yield call(phoneVerificationConfirmCode, params);

    yield put(UserCreators.phoneVerificationConfirmCodeSuccess());
  } catch (error) {
    yield put(UserCreators.phoneVerificationConfirmCodeFailure());
  }
}

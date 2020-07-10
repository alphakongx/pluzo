import { call, put, takeEvery, select } from "redux-saga/effects";
import { UserCreators, UserTypes } from "../actions";
import {
  login,
  phoneLoginSendCode,
  phoneLoginConfirmCode,
  register,
  phoneVerificationSendCode,
  phoneVerificationConfirmCode,
  forgotPasswordSendCode,
  forgotPasswordConfirmCode,
  resetPassword,
} from "@redux/api";
import moment from "moment";
import { registrationSelector } from "../selectors";
import { NavigationService, Notification } from "@helpers";
import { SCREENS } from "@constants";

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
  yield takeEvery(
    UserTypes.REQUEST_FORGOT_PASSWORD_SEND_CODE,
    requestForgotPasswordSendCode,
  );
  yield takeEvery(
    UserTypes.REQUEST_FORGOT_PASSWORD_CONFIRM_CODE,
    requestForgotPasswordConfirmCode,
  );
  yield takeEvery(UserTypes.REQUEST_RESET_PASSWORD, requestResetPassword);
  yield takeEvery(UserTypes.REQUEST_PHONE_LOGIN_SEND_CODE, requestPhoneLoginSendCode);
  yield takeEvery(
    UserTypes.REQUEST_PHONE_LOGIN_CONFIRM_CODE,
    requestPhoneLoginConfirmCode,
  );
}

function* requestLogin(action) {
  try {
    const { params } = action;
    const requestParams = new FormData();
    requestParams.append("username", params.username);
    requestParams.append("password", params.password);
    const response = yield call(login, requestParams);

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
    params.append("birthday", moment(registrationData.birthDate).unix());
    params.append("gender", registrationData.gender);
    params.append("username", registrationData.username);
    params.append("password", registrationData.password);
    params.append("phone", registrationData.phoneNumber);
    // params.append("image", registrationData.picture);

    const response = yield call(register, params);

    yield put(UserCreators.registrationSuccess(response.data.data));
  } catch (error) {
    console.log(error);
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
    const { code, isSignUp } = action;
    const params = new FormData();

    params.append("phone", phoneNumber);
    params.append("code", code);

    const response = yield call(phoneVerificationConfirmCode, params);
    if (isSignUp)
      NavigationService.navigate(SCREENS.SIGNUP_SUCCESS, { user: response.data.data });

    yield put(UserCreators.phoneVerificationConfirmCodeSuccess());
  } catch (error) {
    yield put(UserCreators.phoneVerificationConfirmCodeFailure());
  }
}

function* requestForgotPasswordSendCode(action) {
  try {
    const { phoneNumber, shouldNavigate } = action;
    const params = new FormData();

    params.append("phone", phoneNumber);

    yield call(forgotPasswordSendCode, params);

    if (shouldNavigate)
      NavigationService.navigate(SCREENS.RESET_PASSWORD_CODE_VERIFICATION, {
        phoneNumber,
      });

    yield put(UserCreators.forgotPasswordSendCodeSuccess());
  } catch (error) {
    yield put(UserCreators.forgotPasswordSendCodeFailure());
  }
}

function* requestForgotPasswordConfirmCode(action) {
  try {
    const { phoneNumber, code } = action;
    const params = new FormData();

    params.append("phone", phoneNumber);
    params.append("code", code);

    const response = yield call(forgotPasswordConfirmCode, params);
    const passwordResetToken = response.data.data.pass_code;

    NavigationService.navigate("RESET_PASSWORD", { phoneNumber, passwordResetToken });
    yield put(UserCreators.forgotPasswordConfirmCodeSuccess());
  } catch (error) {
    yield put(UserCreators.forgotPasswordConfirmCodeFailure());
  }
}

function* requestResetPassword(action) {
  try {
    const { phoneNumber, passwordResetToken, password } = action;
    const params = new FormData();

    params.append("phone", phoneNumber);
    params.append("pass_code", passwordResetToken);
    params.append("password", password);

    yield call(resetPassword, params);

    Notification.alert("Password Updated", "Password Updated Successfully", null, () => {
      NavigationService.popToTop();
    });
    yield put(UserCreators.resetPasswordSuccess());
  } catch (error) {
    yield put(UserCreators.resetPasswordFailure());
  }
}

function* requestPhoneLoginSendCode(action) {
  try {
    const { phoneNumber, shouldNavigate } = action;
    const params = new FormData();

    params.append("phone", phoneNumber);

    yield call(phoneLoginSendCode, params);

    if (shouldNavigate)
      NavigationService.navigate(SCREENS.LOGIN_PHONE_CODE_VERIFICATION, { phoneNumber });

    yield put(UserCreators.phoneLoginSendCodeSuccess());
  } catch (error) {
    yield put(UserCreators.phoneLoginSendCodeFailure());
  }
}

function* requestPhoneLoginConfirmCode(action) {
  try {
    const { phoneNumber, code } = action;
    const params = new FormData();

    params.append("phone", phoneNumber);
    params.append("code", code);

    const response = yield call(phoneLoginConfirmCode, params);

    yield put(UserCreators.loginSuccess(response.data.data));
    yield put(UserCreators.phoneLoginConfirmCodeSuccess());
  } catch (error) {
    yield put(UserCreators.phoneLoginConfirmCodeFailure());
  }
}

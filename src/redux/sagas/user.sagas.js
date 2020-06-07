import { call, put, takeEvery, select } from "redux-saga/effects";
import {
  login,
  loginSchool,
  fetchProfile,
  resetPassword,
  googleLogin,
} from "../api";
import { UserCreators, UserTypes } from "../actions";
import NavigationService from "@navigation/navigation-service";
import { PushNotifications } from "@helpers";
import { schoolApiAccessTokenSelector } from "../selectors";
import { SCREENS } from "@constants";

export function* watchUserRequests() {
  yield takeEvery(UserTypes.REQUEST_LOGIN, requestLogin);
  yield takeEvery(UserTypes.REQUEST_GOOGLE_LOGIN, requestGoogleLogin);
  yield takeEvery(UserTypes.REQUEST_SCHOOL_LOGIN, requestSchoolLogin);
  yield takeEvery(UserTypes.FETCH_PROFILE, requestProfile);
  yield takeEvery(UserTypes.REQUEST_RESET_PASSWORD, requestResetPassword);
  yield takeEvery(UserTypes.LOGOUT, logout);
}

function* requestLogin(action) {
  try {
    const response = yield call(
      login,
      action.params,
      action.params.schoolApiAccessToken,
    );

    const { details } = response.data.status;
    yield put(UserCreators.loginSuccess(details));
    NavigationService.navigateToDashboard(details.user);
    PushNotifications.configure(details.user);
  } catch (error) {
    yield put(UserCreators.loginFailure(error));
  }
}

function* requestGoogleLogin(action) {
  try {
    const response = yield call(
      googleLogin,
      action.params,
      action.params.schoolApiAccessToken,
    );
    const { details } = response.data.status;
    yield put(UserCreators.googleLoginSuccess(details));
    NavigationService.navigateToDashboard(details.user);
    PushNotifications.configure(details.user);
  } catch (error) {
    yield put(UserCreators.googleLoginFailure(error));
  }
}

function* requestSchoolLogin(action) {
  try {
    const response = yield call(
      loginSchool,
      action.params,
      action.params.schoolApiAccessToken,
    );
    yield put(UserCreators.schoolLoginSuccess(response.data.data));
    NavigationService.navigate("HomeNavigator");
  } catch (error) {
    yield put(UserCreators.schoolLoginFailure(error));
  }
}

function* requestProfile(action) {
  try {
    const schoolApiAccessToken = yield select(schoolApiAccessTokenSelector);

    const userIdSelector = state => state.session.user.id;
    const userId = yield select(userIdSelector);

    const response = yield call(
      fetchProfile,
      action.params,
      userId,
      schoolApiAccessToken,
    );
    yield put(
      UserCreators.fetchProfileSuccess(
        response.data.status.details.student,
      ),
    );
  } catch (error) {
    yield put(UserCreators.fetchProfileFailure(error));
  }
}

function* requestResetPassword(action) {
  try {
    const response = yield call(
      resetPassword,
      action.params,
      action.schoolApiAccessToken,
    );
    yield put(UserCreators.resetPasswordSuccess());
    NavigationService.navigate("ResetPasswordAcknowledgement");
  } catch (error) {
    yield put(UserCreators.resetPasswordFailure(error));
  }
}

function* logout(action) {
  PushNotifications.unsubscribeFromPubNub();
  NavigationService.navigate(SCREENS.AUTH_STACK);
}

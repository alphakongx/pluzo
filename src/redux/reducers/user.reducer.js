import { createReducer } from "reduxsauce";
import { UserTypes } from "../actions";
import storeInitialState from "../store/initial-state";
export const INITIAL_STATE = storeInitialState.user;

const logout = (state, action) => INITIAL_STATE;

const requestLogin = (state, action) => ({
  ...state,
  isLoggingIn: true,
});
const loginSuccess = (state, action) => ({
  ...state,
  // token: action.sessionData.token,
  // user: action.sessionData,
  isLoggingIn: false,
});
const loginFailure = (state, action) => ({
  ...state,
  isLoggingIn: false,
});

const requestRegistration = (state, action) => ({
  ...state,
  isRegistring: true,
});
const registrationSuccess = (state, action) => ({
  ...state,
  token: action.sessionData.token,
  user: action.sessionData,
  isRegistring: false,
});
const registrationFailure = (state, action) => ({
  ...state,
  isRegistring: false,
});

const requestPhoneVerificationSendCode = (state, action) => ({
  ...state,
  isSendingPhoneVerificationCode: true,
});
const phoneVerificationSendCodeSuccess = (state, action) => ({
  ...state,
  isSendingPhoneVerificationCode: false,
});
const phoneVerificationSendCodeFailure = (state, action) => ({
  ...state,
  isSendingPhoneVerificationCode: false,
});

const requestPhoneVerificationConfirmCode = (state, action) => ({
  ...state,
  isConfirmingPhoneVerificationCode: true,
});
const phoneVerificationConfirmCodeSuccess = (state, action) => ({
  ...state,
  isConfirmingPhoneVerificationCode: false,
});
const phoneVerificationConfirmCodeFailure = (state, action) => ({
  ...state,
  isConfirmingPhoneVerificationCode: false,
});

const requestForgotPasswordSendCode = (state, action) => ({
  ...state,
  isSendingForgotPasswordCode: true,
});
const forgotPasswordSendCodeSuccess = (state, action) => ({
  ...state,
  isSendingForgotPasswordCode: false,
});
const forgotPasswordSendCodeFailure = (state, action) => ({
  ...state,
  isSendingForgotPasswordCode: false,
});

const requestForgotPasswordConfirmCode = (state, action) => ({
  ...state,
  isConfirmingForgotPasswordCode: true,
});
const forgotPasswordConfirmCodeSuccess = (state, action) => ({
  ...state,
  isConfirmingForgotPasswordCode: false,
});
const forgotPasswordConfirmCodeFailure = (state, action) => ({
  ...state,
  isConfirmingForgotPasswordCode: false,
});

const requestResetPassword = (state, action) => ({
  ...state,
  isResettingPassword: true,
});
const resetPasswordSuccess = (state, action) => ({
  ...state,
  isResettingPassword: false,
});
const resetPasswordFailure = (state, action) => ({
  ...state,
  isResettingPassword: false,
});

export const HANDLERS = {
  [UserTypes.REQUEST_LOGIN]: requestLogin,
  [UserTypes.LOGIN_SUCCESS]: loginSuccess,
  [UserTypes.LOGIN_FAILURE]: loginFailure,

  [UserTypes.REQUEST_REGISTRATION]: requestRegistration,
  [UserTypes.REGISTRATION_SUCCESS]: registrationSuccess,
  [UserTypes.REGISTRATION_FAILURE]: registrationFailure,

  [UserTypes.REQUEST_PHONE_VERIFICATION_SEND_CODE]: requestPhoneVerificationSendCode,
  [UserTypes.PHONE_VERIFICATION_SEND_CODE_SUCCESS]: phoneVerificationSendCodeSuccess,
  [UserTypes.PHONE_VERIFICATION_SEND_CODE_FAILURE]: phoneVerificationSendCodeFailure,

  [UserTypes.REQUEST_PHONE_VERIFICATION_CONFIRM_CODE]: requestPhoneVerificationConfirmCode,
  [UserTypes.PHONE_VERIFICATION_CONFIRM_CODE_SUCCESS]: phoneVerificationConfirmCodeSuccess,
  [UserTypes.PHONE_VERIFICATION_CONFIRM_CODE_FAILURE]: phoneVerificationConfirmCodeFailure,

  [UserTypes.REQUEST_FORGOT_PASSWORD_SEND_CODE]: requestForgotPasswordSendCode,
  [UserTypes.FORGOT_PASSWORD_SEND_CODE_SUCCESS]: forgotPasswordSendCodeSuccess,
  [UserTypes.FORGOT_PASSWORD_SEND_CODE_FAILURE]: forgotPasswordSendCodeFailure,

  [UserTypes.REQUEST_FORGOT_PASSWORD_CONFIRM_CODE]: requestForgotPasswordConfirmCode,
  [UserTypes.FORGOT_PASSWORD_CONFIRM_CODE_SUCCESS]: forgotPasswordConfirmCodeSuccess,
  [UserTypes.FORGOT_PASSWORD_CONFIRM_CODE_FAILURE]: forgotPasswordConfirmCodeFailure,

  [UserTypes.REQUEST_RESET_PASSWORD]: requestResetPassword,
  [UserTypes.RESET_PASSWORD_SUCCESS]: resetPasswordSuccess,
  [UserTypes.RESET_PASSWORD_FAILURE]: resetPasswordFailure,

  [UserTypes.LOGOUT]: logout,
};

export default createReducer(INITIAL_STATE, HANDLERS);

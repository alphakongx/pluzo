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
  isLoggingIn: false,
  token: action.sessionData.token,
  user: action.sessionData,
});
const loginFailure = (state, action) => ({
  ...state,
  isLoggingIn: false,
});

const requestProfile = (state, action) => ({
  ...state,
  isLoadingProfile: true,
});
const loadProfileSuccess = (state, action) => ({
  ...state,
  isLoadingProfile: false,
  token: action.sessionData.token,
  user: action.sessionData,
});
const loadProfileFailure = (state, action) => ({
  ...state,
  isLoadingProfile: false,
});

const requestPhoneLoginSendCode = (state, action) => ({
  ...state,
  isSendingPhoneLoginCode: true,
});
const phoneLoginSendCodeSuccess = (state, action) => ({
  ...state,
  isSendingPhoneLoginCode: false,
});
const phoneLoginSendCodeFailure = (state, action) => ({
  ...state,
  isSendingPhoneLoginCode: false,
});

const requestPhoneLoginConfirmCode = (state, action) => ({
  ...state,
  isConfirmingPhoneLoginCode: true,
});
const phoneLoginConfirmCodeSuccess = (state, action) => ({
  ...state,
  isConfirmingPhoneLoginCode: false,
});
const phoneLoginConfirmCodeFailure = (state, action) => ({
  ...state,
  isConfirmingPhoneLoginCode: false,
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

const requestUpdateUser = (state, action) => ({
  ...state,
});
const updateUserSuccess = (state, action) => ({
  ...state,
  user: action.sessionData,
});
const updateUserFailure = (state, action) => ({
  ...state,
});

const updateLocation = (state, action) => ({
  ...state,
  location: action.location,
});

const requestDeleteImage = (state, action) => ({
  ...state,
  isDeletingImage: action.imageId,
});
const deleteImageSuccess = (state, action) => ({
  ...state,
  isDeletingImage: 0,
  user: action.sessionData,
});
const deleteImageFailure = (state, action) => ({
  ...state,
  deleteImageFailure: 0,
});

export const HANDLERS = {
  [UserTypes.REQUEST_LOGIN]: requestLogin,
  [UserTypes.LOGIN_SUCCESS]: loginSuccess,
  [UserTypes.LOGIN_FAILURE]: loginFailure,

  [UserTypes.REQUEST_PROFILE]: requestProfile,
  [UserTypes.LOAD_PROFILE_SUCCESS]: loadProfileSuccess,
  [UserTypes.LOAD_PROFILE_FAILURE]: loadProfileFailure,

  [UserTypes.REQUEST_PHONE_LOGIN_SEND_CODE]: requestPhoneLoginSendCode,
  [UserTypes.PHONE_LOGIN_SEND_CODE_SUCCESS]: phoneLoginSendCodeSuccess,
  [UserTypes.PHONE_LOGIN_SEND_CODE_FAILURE]: phoneLoginSendCodeFailure,

  [UserTypes.REQUEST_PHONE_LOGIN_CONFIRM_CODE]: requestPhoneLoginConfirmCode,
  [UserTypes.PHONE_LOGIN_CONFIRM_CODE_SUCCESS]: phoneLoginConfirmCodeSuccess,
  [UserTypes.PHONE_LOGIN_CONFIRM_CODE_FAILURE]: phoneLoginConfirmCodeFailure,

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

  [UserTypes.REQUEST_UPDATE_USER]: requestUpdateUser,
  [UserTypes.UPDATE_USER_SUCCESS]: updateUserSuccess,
  [UserTypes.UPDATE_USER_FAILURE]: updateUserFailure,

  [UserTypes.UPDATE_LOCATION]: updateLocation,

  [UserTypes.REQUEST_DELETE_IMAGE]: requestDeleteImage,
  [UserTypes.DELETE_IMAGE_SUCCESS]: deleteImageSuccess,
  [UserTypes.DELETE_IMAGE_FAILURE]: deleteImageFailure,

  [UserTypes.LOGOUT]: logout,
};

export default createReducer(INITIAL_STATE, HANDLERS);

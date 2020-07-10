import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  requestLogin: ["params"],
  loginSuccess: ["sessionData"],
  loginFailure: null,

  requestPhoneLoginSendCode: ["phoneNumber", "shouldNavigate"],
  phoneLoginSendCodeSuccess: null,
  phoneLoginSendCodeFailure: null,

  requestPhoneLoginConfirmCode: ["phoneNumber", "code"],
  phoneLoginConfirmCodeSuccess: ["sessionData"],
  phoneLoginConfirmCodeFailure: null,

  requestRegistration: null,
  registrationSuccess: ["sessionData"],
  registrationFailure: null,

  requestPhoneVerificationSendCode: ["phoneNumber"],
  phoneVerificationSendCodeSuccess: null,
  phoneVerificationSendCodeFailure: null,

  requestPhoneVerificationConfirmCode: ["code", "isSignUp"],
  phoneVerificationConfirmCodeSuccess: ["sessionData"],
  phoneVerificationConfirmCodeFailure: null,

  requestForgotPasswordSendCode: ["phoneNumber", "shouldNavigate"],
  forgotPasswordSendCodeSuccess: null,
  forgotPasswordSendCodeFailure: null,

  requestForgotPasswordConfirmCode: ["phoneNumber", "code"],
  forgotPasswordConfirmCodeSuccess: null,
  forgotPasswordConfirmCodeFailure: null,

  requestResetPassword: ["phoneNumber", "passwordResetToken", "password"],
  resetPasswordSuccess: null,
  resetPasswordFailure: null,

  logout: null,
});

export const UserTypes = Types;
export const UserCreators = Creators;

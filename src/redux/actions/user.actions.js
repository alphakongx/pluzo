import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  requestLogin: ["params"],
  loginSuccess: ["sessionData"],
  loginFailure: null,

  requestRegistration: null,
  registrationSuccess: ["sessionData"],
  registrationFailure: null,

  requestPhoneVerificationSendCode: ["phoneNumber"],
  phoneVerificationSendCodeSuccess: null,
  phoneVerificationSendCodeFailure: null,

  requestPhoneVerificationConfirmCode: ["code"],
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

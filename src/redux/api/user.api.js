import { API } from "@helpers";
import { API_ENDPOINTS } from "@config";

export function login(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.LOGIN}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  }).then(response => response);
}

export function phoneLoginSendCode(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.LOGIN_PHONE_SEND_CODE}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  }).then(response => response);
}

export function phoneLoginConfirmCode(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.LOGIN_PHONE_VERIFY_CODE}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  }).then(response => response);
}

export function register(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.REGISTER}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  }).then(response => response);
}

export function phoneVerificationSendCode(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.VERIFY_PHONE_SEND_CODE}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  }).then(response => response);
}

export function phoneVerificationConfirmCode(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.VERIFY_PHONE_CONFIRM_CODE}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  }).then(response => response);
}

export function forgotPasswordSendCode(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.FORGOT_PASSWORD_SEND_CODE}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  }).then(response => response);
}

export function forgotPasswordConfirmCode(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.FORGOT_PASSWORD_CONFIRM_CODE}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  }).then(response => response);
}

export function resetPassword(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.RESET_PASSWORD}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  }).then(response => response);
}

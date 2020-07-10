const BASE_URL = "http://3.22.210.170/api/web";

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/login`,
  LOGIN_PHONE_SEND_CODE: `${BASE_URL}/login-sms-send`,
  LOGIN_PHONE_VERIFY_CODE: `${BASE_URL}/login-sms-code`,

  REGISTER: `${BASE_URL}/signup`,

  VERIFY_PHONE_SEND_CODE: `${BASE_URL}/verify-sms-send`,
  VERIFY_PHONE_CONFIRM_CODE: `${BASE_URL}/verify-sms-code`,

  FORGOT_PASSWORD_SEND_CODE: `${BASE_URL}/forgot-sms-send`,
  FORGOT_PASSWORD_CONFIRM_CODE: `${BASE_URL}/forgot-sms-code`,

  RESET_PASSWORD: `${BASE_URL}/new-pass-code`,

  GET_CHAT: `${BASE_URL}/get-chat`,

  GET_CARDS: `${BASE_URL}/swipe`,
  SEND_LIKE: `${BASE_URL}/send-like`,
  SEND_LIKE_ALL: `${BASE_URL}/send-like-all`,
  GET_MATCH: `${BASE_URL}/get-match`,
};

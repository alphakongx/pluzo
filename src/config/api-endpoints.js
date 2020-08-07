const BASE_URL = "https://api.pluzo.com";

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/login`,
  LOGIN_PHONE_SEND_CODE: `${BASE_URL}/login-sms-send`,
  LOGIN_PHONE_VERIFY_CODE: `${BASE_URL}/login-sms-code`,

  REGISTER: `${BASE_URL}/signup`,

  CHECK_USERNAME: `${BASE_URL}/check-username`,
  REORDER_IMAGES: `${BASE_URL}/sort-image`,
  PROFILE: `${BASE_URL}/profile`,

  VERIFY_PHONE_SEND_CODE: `${BASE_URL}/verify-sms-send`,
  VERIFY_PHONE_CONFIRM_CODE: `${BASE_URL}/verify-sms-code`,

  FORGOT_PASSWORD_SEND_CODE: `${BASE_URL}/forgot-sms-send`,
  FORGOT_PASSWORD_CONFIRM_CODE: `${BASE_URL}/forgot-sms-code`,

  RESET_PASSWORD: `${BASE_URL}/new-pass-code`,

  UPDATE_USER: `${BASE_URL}/update`,
  DELETE_IMAGE: `${BASE_URL}/delete-image`,

  GET_CHAT: `${BASE_URL}/get-chat`,
  GET_CHAT_MSG: `${BASE_URL}/get-chat-msg`,
  DELETE_CHAT: `${BASE_URL}/delete-chat`,
  SEND_MSG: `${BASE_URL}/send-msg`,
  READ_MSG: `${BASE_URL}/read-message`,
  UPDATE_MSG: `${BASE_URL}/update-msg`,
  DELETE_MSG: `${BASE_URL}/delete-msg`,
  GET_CURRENT_CHAT: `${BASE_URL}/get-current-chat`,
  GET_CHAT_USER: `${BASE_URL}/get-chat-user`,

  GET_FRIENDS: `${BASE_URL}/get-friends`,
  GET_FRIEND_REQUESTS: `${BASE_URL}/friend-requests-to-me`,
  ACCEPT_FRIEND_REQUEST: `${BASE_URL}/add-friend`,
  REJECT_FRIEND_REQUEST: `${BASE_URL}/friend-requests-reject`,
  ADD_FRIEND_USERNAME: `${BASE_URL}/add-friend-username`,

  GET_CARDS: `${BASE_URL}/swipe`,
  SEND_LIKE: `${BASE_URL}/send-like`,
  SEND_LIKE_ALL: `${BASE_URL}/send-like-all`,
  GET_MATCH: `${BASE_URL}/get-match`,

  SEARCH: `${BASE_URL}/search`,
};

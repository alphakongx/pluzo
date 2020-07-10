import { API } from "@helpers";
import { API_ENDPOINTS } from "@config";

export function getCards(accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.GET_CARDS}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
  }).then(response => response);
}

export function sendLike(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.SEND_LIKE}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
  }).then(response => response);
}

export function sendLikeAll(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.SEND_LIKE_ALL}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
  }).then(response => response);
}

export function getMatchUsers(accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.GET_MATCH}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
  }).then(response => response);
}

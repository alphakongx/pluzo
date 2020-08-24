import { API } from "@helpers";
import { API_ENDPOINTS } from "@config";

export function streamStart(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.STREAM_START}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
  }).then(response => response);
}

export function streamStop(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.STREAM_STOP}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
    silent: true,
  }).then(response => response);
}

export function streamList(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.STREAM_LIST}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
  }).then(response => response);
}

export function streamUserList(data, accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.STREAM_USER_LIST}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
    data,
  }).then(response => response);
}

import { API } from "@helpers";
import { API_ENDPOINTS } from "@config";

export function getChat(accessToken) {
  return API.request({
    method: "post",
    url: `${API_ENDPOINTS.GET_CHAT}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
  }).then(response => response);
}

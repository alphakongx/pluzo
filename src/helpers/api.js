import axios from "axios";
import _ from "lodash";
import EventBus from "eventing-bus";
import { Notification } from "./notification";
import i18n from "i18next";
import { CANCEL } from "redux-saga";

const CancelToken = axios.CancelToken;
const DEBUG = false;

export class API {
  static headers() {
    return {
      "Content-Type": "application/json",
      platform: "mobile",
    };
  }

  static request(options) {
    options.headers = _.merge(this.headers(), options.headers);
    const source = CancelToken.source();
    options.cancelToken = source.token;
    const timeoutHandler = setTimeout(() => {
      source.cancel();
    }, 15000);

    const request = axios(options)
      .then(response => {
        clearTimeout(timeoutHandler);

        // if (response.data && response.data.status && response.data.status.code !== 200) {
        //   // Notification.error(
        //   //   response.data.status.message,
        //   //   response.data.status.explanation,
        //   // );
        //   throw response;
        // }

        return response;
      })
      .catch(error => {
        clearTimeout(timeoutHandler);
        console.log(error.response.data.message);
        if (options.silent === true) {
          console.log(error.response.data.error);
          // throw error;
        } else if (error.message === "Network Error") {
          axios({
            mehtod: "get",
            url: "https://google.com",
          })
            .then(response => {
              if (!options.silent && DEBUG)
                Notification.alert(i18n.t(`alerts.failure.serverNotResponding`));

              throw error;
            })
            .catch(err => {
              if (!options.silent && DEBUG) {
                Notification.alert(i18n.t(`alerts.failure.checkInternetConnection`));
              }
              throw err;
            });
        } else {
          if (error.response && error.response.status === 401) {
            Notification.alert("Invalid username/password");
          } else if (error.response && error.response.data && error.response.data.error) {
            if (!options.silent) {
              Notification.alert(error.response.data.message);
            }
          }
          throw error;
        }
        throw error;
      });

    EventBus.on("LOGOUT", () => source.cancel());
    request[CANCEL] = () => source.cancel();
    return request;
  }
}

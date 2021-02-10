import React from "react";
import OneSignal from "react-native-onesignal";
import { connect } from "react-redux";
import { UserCreators } from "@redux/actions";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import EventBus from "eventing-bus";
import { SCREENS } from "@constants";
import { NavigationService } from "@helpers";

class PushNotification extends React.Component {
  constructor(props) {
    super(props);
    //Remove this method to stop OneSignal Debugging
    OneSignal.setLogLevel(6, 1);
    OneSignal.setLocationShared(false);

    // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
    OneSignal.init("b183cfca-4929-462d-b50d-d28ded4347a2", {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 0,
    });
    OneSignal.inFocusDisplaying(0); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.

    // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
    if (Platform.OS === "ios") {
      OneSignal.promptForPushNotificationsWithUserResponse(permission => {
        // console.log("Permissions: ", permission);
      });
    }

    OneSignal.addEventListener("received", this.onReceived);
    OneSignal.addEventListener("opened", this.onOpened);
    OneSignal.addEventListener("ids", this.onIds);
  }

  componentDidMount() {
    this.tokenAction = EventBus.on("UPDATE_PUSH_TOKEN", () => {
      this.updatePushToken();
    });
  }

  componentWillUnmount() {
    OneSignal.removeEventListener("received", this.onReceived);
    OneSignal.removeEventListener("opened", this.onOpened);
    OneSignal.removeEventListener("ids", this.onIds);
    this.tokenAction();
  }

  updatePushToken = async () => {
    this.pushToken = await AsyncStorage.getItem("PUSH_TOKEN");
    if (this.pushToken !== undefined && this.pushToken !== null) {
      const params = new FormData();
      params.append("push_id", this.pushToken);
      params.append("device", Platform.OS === "ios" ? 1 : 2);
      this.props.updateUser(params, this.props.token);
    }
  };

  onReceived(notification) {
    // console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    let data = openResult.notification.payload.additionalData;
    if (data) {
      if (data.action === "chat") {
        if (data.chat_id && data.user_model) {
          if (NavigationService.getCurrentRoute(null) === "CHAT") {
            NavigationService.popToTop();
          }
          setTimeout(() => {
            NavigationService.navigate(SCREENS.CHAT, {chatId: data.chat_id, chatUser: data.user_model});
          }, 500);
        }
      } else if (data.action === "friend_request") {
        if (data.user_model) {
          EventBus.publish("NEW_PENDING_REQUEST");
          // NavigationService.navigate(SCREENS.CHAT, {chatUser: data.user_model});
        }
      } else if (data.action === "friends") {
        if (data.user_model) {
          if (NavigationService.getCurrentRoute(null) === "CHAT") {
            NavigationService.popToTop();
          }
          setTimeout(() => {
            NavigationService.navigate(SCREENS.CHAT, {chatUser: data.user_model});
          }, 500);
        }
      } else if (data.action === "stream") {
        EventBus.publish("APP_END_STREAM_ACTION");
        setTimeout(() => {
          let params = {
            channelName: data.channel_id,
            isBroadcaster: false,
            isJoin: true,
          };
          EventBus.publish("NEW_STREAM_ACTION", params);
        }, 1000);
      } else if (data.action === "stream_invite") {
        EventBus.publish("APP_END_STREAM_ACTION");
        setTimeout(() => {
          let params = {
            channelName: data.channel_id,
            isBroadcaster: false,
            isJoin: true,
          };
          EventBus.publish("NEW_STREAM_ACTION", params);
        }, 1000);
      }
    }
  }

  onIds(device) {
    AsyncStorage.setItem("PUSH_TOKEN", device.userId, err => {
      if (err === null) {
        EventBus.publish("UPDATE_PUSH_TOKEN");
      }
    });
  }

  render() {
    return null;
  }
}

function mapStateToProps(state) {
  return {
    token: state.user.token,
  };
}

const mapDispatchToProps = {
  updateUser: UserCreators.requestUpdateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(PushNotification);

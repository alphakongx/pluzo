import { Alert } from "react-native";

export class Notification {
  static alert(title = "", message, config, onPress = () => {}) {
    Alert.alert(title, message, [{ text: "OK", onPress: onPress }]);
  }

  static confirmAlert(title = "", message, onConfirm = () => {}) {
    Alert.alert(
      title,
      message,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: onConfirm },
      ],
      { cancelable: false },
    );
  }
}

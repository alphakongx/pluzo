import React, { useEffect } from "react";
import { Platform, View } from "react-native";
import { Screen } from "@components";
import Header from "./header";
import { GiftedChat } from "react-native-gifted-chat";
import KeyboardManager from "react-native-keyboard-manager";
import styles from "./chat.style";
const messages = [
  {
    _id: 1,
    text: "Hi, how are you?",
    createdAt: new Date(),
    user: {
      _id: 2,
      name: "React Native",
    },
  },
  {
    _id: 2,
    text: "HELLOOOO",
    createdAt: new Date(),
    user: {
      _id: 1,
      name: "React Native",
    },
  },
];

const Chat: () => React$Node = props => {
  useEffect(() => {
    console.log("Mounted");

    if (Platform.OS === "ios") {
      KeyboardManager.setKeyboardDistanceFromTextField(0);
      KeyboardManager.setEnable(false);
    }

    return () => {
      if (Platform.OS === "ios") {
        KeyboardManager.setKeyboardDistanceFromTextField(65);
        KeyboardManager.setEnable(true);
      }
    };
  });

  return (
    <Screen hasHeader style={styles.container}>
      <Header />
      <View style={styles.body}>
        <GiftedChat
          messages={messages}
          isTyping={true}
          isKeyboardInternallyHandled={true}
          user={{
            _id: 2,
          }}
        />
      </View>
    </Screen>
  );
};

export default Chat;

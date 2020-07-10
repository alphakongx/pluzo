import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  View,
  TextInput as RNTextInput,
  ScrollView,
  FlatList,
  SafeAreaView,
  Keyboard,
  Platform,
} from "react-native";
import { Touchable, Image, Text } from "@components";
import KeyboardManager from "react-native-keyboard-manager";
import Images from "@assets/Images";

import styles from "./stream-message-box.style.js";

class StreamMessageBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          id: "1",
          name: "Lara Cruse",
          message: "You look so good today!! xo",
          avatar: require("@assets/images/live-screen/user-temp1.png"),
        },
        {
          id: "2",
          name: "Cody79",
          message: "laugh",
          avatar: require("@assets/images/live-screen/user-temp2.png"),
        },
      ],
    };
  }

  componentDidMount() {
    if (Platform.OS === "ios") {
      KeyboardManager.setEnable(false);
    }
    Keyboard.addListener("keyboardWillShow", this.keyboardWillShow);
    Keyboard.addListener("keyboardWillHide", this.keyboardWillHide);
  }

  componentWillUnMount() {
    if (Platform.OS === "ios") {
      KeyboardManager.setEnable(true);
    }
    Keyboard.removeListener("keyboardWillShow", this.keyboardWillShow);
    Keyboard.removeListener("keyboardWillHide", this.keyboardWillHide);
  }

  keyboardWillShow = e => {
    if (this.props.onKeyboardShow !== null) {
      this.props.onKeyboardShow(e);
    }
  };

  keyboardWillHide = e => {
    if (this.props.onKeyboardHide !== null) {
      this.props.onKeyboardHide(e);
    }
  };

  render() {
    const { messages } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          <RNTextInput
            style={styles.inputField}
            placeholder={"Enter a message..."}
            placeholderTextColor={"#FFFFFF"}
            numberOfLines={1}
          />
          <Touchable style={styles.sendButton}>
            <Image source={Images.app.icSend} style={styles.sendIcon} />
          </Touchable>
        </View>

        <View style={styles.defaultButtonsContainer}>
          <ScrollView horizontal>
            <Touchable style={styles.defaultButton}>
              <Text style={styles.defaultButtonText}>Hello!</Text>
            </Touchable>
            <Touchable style={styles.defaultButton}>
              <Image source={Images.live.emojiLaugh} />
            </Touchable>
            <Touchable style={styles.defaultButton}>
              <Text style={styles.defaultButtonText}>Invite me please</Text>
            </Touchable>
            <Touchable style={styles.defaultButton}>
              <Text style={styles.defaultButtonText}>LMAO</Text>
            </Touchable>
          </ScrollView>
        </View>

        <FlatList
          style={styles.messageList}
          data={messages}
          inverted
          keyExtractor={item => item.id}
          renderItem={({ item: message, index }) => {
            return (
              <View style={styles.messageItemContainer}>
                <View style={styles.messageTextContainer}>
                  <Text style={styles.messageUser}>{message.name}</Text>
                  {message.message === "laugh" && (
                    <Image source={Images.live.emojiLaugh} />
                  )}
                  {message.message !== "laugh" && (
                    <Text style={styles.messageText}>{message.message}</Text>
                  )}
                </View>
                <Image source={message.avatar} style={styles.messageAvatar} />
              </View>
            );
          }}
        />
      </SafeAreaView>
    );
  }
}

StreamMessageBox.propTypes = {
  onKeyboardShow: PropTypes.func,
  onKeyboardHide: PropTypes.func,
};

StreamMessageBox.defaultProps = {
  onKeyboardShow: null,
  onKeyboardHide: null,
};

export default StreamMessageBox;

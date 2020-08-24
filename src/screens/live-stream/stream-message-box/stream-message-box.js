import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
  Keyboard,
  Platform,
} from "react-native";
import { Touchable, Image, Text } from "@components";
import KeyboardManager from "react-native-keyboard-manager";
import { StreamStatus } from "@constants";
import Images from "@assets/Images";
import StreamMessageInput from "./stream-message-input";

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
    this._subscribeKeyboardShow = Keyboard.addListener(
      "keyboardWillShow",
      this.keyboardWillShow,
    );
    this._subscribeKeyboardHide = Keyboard.addListener(
      "keyboardWillHide",
      this.keyboardWillHide,
    );
  }

  componentWillUnMount() {
    if (Platform.OS === "ios") {
      KeyboardManager.setEnable(true);
    }
    this._subscribeKeyboardShow();
    this._subscribeKeyboardHide();
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
    const { streamStatus } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <StreamMessageInput
          onGameControls={this.props.onGameControls}
          onPlayerSetting={this.props.onPlayerSetting}
        />

        <View style={styles.defaultButtonsContainer}>
          {streamStatus === StreamStatus.WAITING ? (
            <View style={styles.defaultButton}>
              <Text style={styles.defaultButtonText}>
                Hold on!. We're telling your friends to join
              </Text>
            </View>
          ) : (
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
          )}
        </View>

        {streamStatus === StreamStatus.STARTED && (
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
        )}
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

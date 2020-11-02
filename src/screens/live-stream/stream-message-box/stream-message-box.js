import PropTypes from "prop-types";
import React, { Component } from "react";
import { View, ScrollView, FlatList, Platform, KeyboardAvoidingView } from "react-native";
import { Touchable, Image, Text, KeyboardListener } from "@components";
import FastImage from "react-native-fast-image";
import KeyboardManager from "react-native-keyboard-manager";
import { StreamStatus } from "@constants";
import Images from "@assets/Images";
import StreamMessageInput from "./stream-message-input";

import styles from "./stream-message-box.style.js";
import EventBus from "eventing-bus";

class StreamMessageBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboardShow: false,
    };
  }

  componentDidMount() {
    if (Platform.OS === "ios") {
      KeyboardManager.setEnable(false);
      KeyboardManager.setShouldResignOnTouchOutside(false);
    }

    this.newMessageAction = EventBus.on("Stream_new_message", jsonData => {
      if (jsonData === undefined) return;
      const { channelName } = this.props.streamParams;
      let data = JSON.parse(jsonData);
      if (channelName === data.stream && this.props.user.id !== data.user._id) {
        let newMessage = {
          id: new Date().getUTCMilliseconds(),
          user: data.user,
          message: data.message,
        };
        if (Platform.OS === "ios") {
          console.log(this.props.messages);
        }
        this.props.updateMessages([newMessage, ...this.props.messages]);
      }
    });
  }

  componentWillUnMount() {
    if (Platform.OS === "ios") {
      KeyboardManager.setEnable(true);
      KeyboardManager.setShouldResignOnTouchOutside(true);
    }
    this.newMessageAction();
  }

  keyboardWillShow = e => {
    if (this.props.onKeyboardShow !== null) {
      this.props.onKeyboardShow(e);
    }
    this.setState({ keyboardShow: true });
  };

  keyboardWillHide = e => {
    if (this.props.onKeyboardHide !== null) {
      this.props.onKeyboardHide(e);
    }
    this.setState({ keyboardShow: false });
  };

  onSendMessage = msg => {
    let newMessage = {
      id: new Date().getUTCMilliseconds(),
      user: this.props.user,
      message: msg,
    };
    this.props.updateMessages([newMessage, ...this.props.messages]);

    const { channelName } = this.props.streamParams;
    this.props.requestChatAdd(channelName, msg, this.props.token);
  };

  onButtonsClicked = msg => {
    this.props.setStreamStatus(StreamStatus.JOIN_MESSAGED);
    this.onSendMessage(msg);
  };

  renderMessageItem = message => {
    if (message.type === "system") {
      return (
        <View style={styles.messageItemContainer}>
          <View style={styles.messageSystemTextContainer}>
            <Text style={styles.messageSystemText}>{message.message}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.messageItemContainer}>
          <View style={styles.messageTextContainer}>
            <Text style={styles.messageUser}>{message.user.first_name}</Text>
            {message.message === "(laugh)" && <Image source={Images.live.emojiLaugh} />}
            {message.message !== "(laugh)" && (
              <Text style={styles.messageText}>{message.message}</Text>
            )}
          </View>
          <Touchable
            style={styles.messageAvatarContainer}
            onPress={() => this.props.onShowProfile(message.user)}
          >
            <FastImage
              source={{ uri: message.user.images[0].path }}
              style={styles.messageAvatar}
            />
          </Touchable>
        </View>
      );
    }
  };

  render() {
    const { streamStatus } = this.props;

    return (
      <KeyboardAvoidingView style={styles.container}>
        <StreamMessageInput
          isKeyboardShown={this.state.keyboardShow}
          isBroadcaster={this.props.isBroadcaster}
          onGameControls={this.props.onGameControls}
          onPlayerSetting={this.props.onPlayerSetting}
          onAskToJoin={this.props.onAskToJoin}
          onSend={msg => this.onSendMessage(msg)}
        />

        {streamStatus === StreamStatus.STARTED ||
        streamStatus === StreamStatus.JOIN_MESSAGED ? null : (
          <View style={styles.defaultButtonsContainer}>
            <ScrollView horizontal keyboardShouldPersistTaps={"always"}>
              <Touchable
                style={styles.defaultButton}
                onPress={() => this.onButtonsClicked("Hello!")}
              >
                <Text style={styles.defaultButtonText}>Hello!</Text>
              </Touchable>
              <Touchable
                style={styles.defaultButton}
                onPress={() => this.onButtonsClicked("(laugh)")}
              >
                <Image source={Images.live.emojiLaugh} />
              </Touchable>
              <Touchable
                style={styles.defaultButton}
                onPress={() => this.onButtonsClicked("Invite me please")}
              >
                <Text style={styles.defaultButtonText}>Invite me please</Text>
              </Touchable>
              <Touchable
                style={styles.defaultButton}
                onPress={() => this.onButtonsClicked("LMAO")}
              >
                <Text style={styles.defaultButtonText}>LMAO</Text>
              </Touchable>
            </ScrollView>
          </View>
        )}

        {(streamStatus === StreamStatus.JOINED ||
          streamStatus === StreamStatus.JOIN_MESSAGED ||
          streamStatus === StreamStatus.STARTED) && (
          <FlatList
            style={styles.messageList}
            data={this.props.messages}
            inverted
            keyExtractor={item => `chat-msg-${item.id}`}
            renderItem={({ item: message, index }) => {
              return this.renderMessageItem(message);
            }}
          />
        )}

        <KeyboardListener
          onWillShow={e => this.keyboardWillShow(e)}
          onWillHide={e => this.keyboardWillHide(e)}
          onDidShow={e => {
            if (Platform.OS === "android") {
              this.keyboardWillShow(e);
            }
          }}
          onDidHide={e => {
            if (Platform.OS === "android") {
              this.keyboardWillHide(e);
            }
          }}
        />
      </KeyboardAvoidingView>
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

import React, { useState, useRef, useEffect } from "react";
import { View, ScrollView, FlatList, Platform, KeyboardAvoidingView } from "react-native";
import { Touchable, Image, Text } from "@components";
import KeyboardManager from "react-native-keyboard-manager";
import LinearGradient from "react-native-linear-gradient";
import * as Animatable from "react-native-animatable";
import FastImage from "react-native-fast-image";
import EventBus from "eventing-bus";
import moment from "moment";

import { StreamStatus } from "@constants";
import { GRADIENT } from "@config";
import Images from "@assets/Images";

import StreamMessageInput from "./stream-message-input";
import styles from "./stream-message-box.style.js";

const { createAnimatableComponent } = Animatable;
const AnimatableView = createAnimatableComponent(View);

const StreamMessageBox: () => React$Node = props => {
  const[currentTime, setCurrentTime] = useState(new Date().getTime());
  const hideMessages = useRef();
  const { streamStatus, bottomPadding, messages } = props;
  let showedMessages = messages.filter((value) => value.created_at > (currentTime - 15000));

  useEffect(() => {
    if (Platform.OS === "ios") {
      KeyboardManager.setEnable(false);
      KeyboardManager.setShouldResignOnTouchOutside(false);
    }
    hideMessages.current = setInterval(() => {
      setCurrentTime(new Date().getTime());
    }, 1000);
    return () => {
      if (Platform.OS === "ios") {
        KeyboardManager.setEnable(true);
        KeyboardManager.setShouldResignOnTouchOutside(true);
      }
      clearInterval(hideMessages.current);
      hideMessages.current = null;
    }
  }, []);

  useEffect(() => {
    let newMessageAction = EventBus.on("Stream_new_message", jsonData => {
      if (jsonData === undefined) return;
      const { channelName } = props.streamParams;
      let data = JSON.parse(jsonData);
      if (channelName === data.stream && props.user.id !== parseInt(data.user._id, 10)) {
        let newMessage = {
          id: `${moment().unix()}.${moment().millisecond()}`,
          user: data.user,
          message: data.message,
          created_at: new Date().getTime(),
          type: parseInt(data.type, 10) === 1 ? "user" : "system",
        };
        props.updateMessages([newMessage].concat(props.messages));
      }
    });

    return () => {
      newMessageAction();
    }
  }, [props.messages, props.streamParams, props.user]);

  const onSendMessage = (msg, msgType) => {
    let newMessage = {
      id: `${moment().unix()}.${moment().millisecond()}`,
      user: props.user,
      message: msg,
      created_at: new Date().getTime(),
    };
    props.updateMessages([newMessage].concat(props.messages));

    const { channelName } = props.streamParams;
    props.requestChatAdd(channelName, msg, msgType, props.token);
    if (props.streamStatus === StreamStatus.JOINED) {
      props.setStreamStatus(StreamStatus.JOIN_MESSAGED);  
    }
  };

  const onButtonsClicked = msg => {
    props.setStreamStatus(StreamStatus.JOIN_MESSAGED);
    onSendMessage(msg, 1);
  };

  const renderMessageItem = message => {
    if (message.type === "system") {
      return (
        <AnimatableView style={styles.messageItemContainer}
          animation={"fadeIn"}
          delay={200}>
          <View style={styles.messageSystemTextContainer}>
            <Text style={styles.messageSystemText}>{message.message}</Text>
          </View>
        </AnimatableView>
      );
    } else {
      return (
        <AnimatableView style={styles.messageItemContainer}
          animation={"fadeIn"}
          delay={200}>
          <View style={styles.messageTextContainer}>
            <Text style={styles.messageUser}>{message.user.first_name}</Text>
            {message.message === "(laugh)" && <Image source={Images.live.emojiLaugh} />}
            {message.message !== "(laugh)" && (
              <Text style={styles.messageText}>{message.message}</Text>
            )}
          </View>
          <Touchable
            style={styles.messageAvatarContainer}
            onPress={() => props.onShowProfile(message.user)}
          >
            <FastImage
              source={{ uri: message.user.images[0].path }}
              style={styles.messageAvatar}
            />
          </Touchable>
        </AnimatableView>
      );
    }
  };

  return (
    <KeyboardAvoidingView style={[styles.container, {paddingBottom: bottomPadding}]}>
      <LinearGradient
        colors={GRADIENT.FADE_UP}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[styles.opacityBottom]}
      />
      <StreamMessageInput
        isKeyboardShown={props.keyboardHeight === 0 ? false : true}
        isBroadcaster={props.isBroadcaster}
        onGameControls={props.onGameControls}
        onPlayerSetting={props.onPlayerSetting}
        onAskToJoin={props.onAskToJoin}
        onSend={msg => onSendMessage(msg, 1)}
        isAskedJoin={props.isAskedToJoin}
      />

      {streamStatus === StreamStatus.STARTED ||
      streamStatus === StreamStatus.JOIN_MESSAGED ? null : (
        <View style={styles.defaultButtonsContainer}>
          <ScrollView horizontal keyboardShouldPersistTaps={"always"}>
            <Touchable
              style={styles.defaultButton}
              onPress={() => onButtonsClicked("Hello!")}
            >
              <Text style={styles.defaultButtonText}>Hello!</Text>
            </Touchable>
            <Touchable
              style={styles.defaultButton}
              onPress={() => onButtonsClicked("(laugh)")}
            >
              <Image source={Images.live.emojiLaugh} />
            </Touchable>
            <Touchable
              style={styles.defaultButton}
              onPress={() => onButtonsClicked("Invite me please")}
            >
              <Text style={styles.defaultButtonText}>Invite me please</Text>
            </Touchable>
            <Touchable
              style={styles.defaultButton}
              onPress={() => onButtonsClicked("LMAO")}
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
          data={props.keyboardHeight !== 0 ? messages : showedMessages}
          inverted
          keyExtractor={(item, index) => `chat-msg-${index}`}
          renderItem={({ item: message, index }) => {
            return renderMessageItem(message);
          }}
        />
      )}
    </KeyboardAvoidingView>
  );
}

export default StreamMessageBox;

import React, { useState } from "react";
import { Linking, View, ActivityIndicator, Image } from "react-native";
import FastImage from "react-native-fast-image";
import { Touchable } from "@components";
import styles from "./message-bubble.style.js";
import Images from "@assets/Images";
import ParsedText from 'react-native-parsed-text';
import MessageLiveItem from "./message-live-item.js";

const MessageBubble: () => React$Node = props => {
  const [loading, setLoading] = useState(true);
  const { currentMessage, user, nextMessage } = props;
  const isCurrentUser = currentMessage.user._id === user._id;
  const hasImage = currentMessage.image ? true : false;
  const hasText =
    currentMessage.text !== null && currentMessage.text !== "" ? true : false;

  const renderTicks = () => {
    if (!isCurrentUser) {
        return null;
    }
    
    if (currentMessage && nextMessage._id === undefined) {          
      return (
        <View style={styles.tickContainer}>
          <View style={[styles.tickView, currentMessage.message_info.sent === 0 ? styles.tickViewSent : currentMessage.message_info.received ? styles.tickViewReceived : styles.tickViewSent]}>
            {currentMessage.message_info.sent === 0 ? (
              <FastImage source={Images.app.icClock} style={styles.tickPedning} />
            ) : (
              <FastImage source={Images.app.icCheck} style={styles.tick} />
            )}
          </View>
        </View>
      );
    }
    return null;
  }

  const handleUrlPress = (url) => {
    Linking.openURL(url);
  }

  if (currentMessage.type === "invite" || currentMessage.type === "close") {
    if (currentMessage.stream_info === null) return null;
    return (
      <View style={[styles.container, styles.containerMargin]}>
        <MessageLiveItem
          currentMessage={currentMessage}
          isCurrentUser={isCurrentUser}
          currentUser={user} />
      </View>
    )
  }

  return (
    <View style={[styles.container, hasImage && hasText ? {} : styles.containerMargin]}>
      {hasImage ? (
        <Touchable
          style={styles.imageContainer}
          onPress={() => props.onFullImage(currentMessage.image)}>
          <FastImage
            source={{ uri: currentMessage.image }}
            style={[
              styles.messageImage,
              hasText ? styles.imageTextRound : styles.imageFullRound,
            ]}
            // resizeMode={FastImage.resizeMode.cover}
            onLoad={(e) => {
              setLoading(false);
            }}
          />
          {loading && 
            <ActivityIndicator size={"large"} style={styles.loadingIndicator} color={"white"} />
          }
        </Touchable>
      ) : null}
      {currentMessage.text !== null && currentMessage.text !== "" && (
        <View
          style={[
            styles.textContainer,
            isCurrentUser
              ? styles.currentUserTextContainer
              : styles.otherUserTextContainer,
            hasImage ? styles.imageText : {},
          ]}
        >
          <ParsedText
            style={[
              styles.text,
              isCurrentUser ? styles.currentUserText : styles.otherUserText,
            ]}
            parse={[
              {type: "url", style: styles.urlText, onPress: handleUrlPress}
            ]}
            allowFontScaling={false}
            selectable
          >
            {currentMessage.text}
          </ParsedText>
        </View>
      )}
      {renderTicks()}
    </View>
  );
};

export default MessageBubble;

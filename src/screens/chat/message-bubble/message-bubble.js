import React from "react";
import { View } from "react-native";
import FastImage from "react-native-fast-image";
import { Text, Touchable } from "@components";
import styles from "./message-bubble.style.js";
import PhotoView from "react-native-photo-view";

const MessageBubble: () => React$Node = props => {
  const { currentMessage, user } = props;
  const isCurrentUser = currentMessage.user._id === user._id;
  const hasImage = currentMessage.image ? true : false;
  const hasText =
    currentMessage.text !== null && currentMessage.text !== "" ? true : false;

  return (
    <View style={[styles.container, hasImage && hasText ? {} : styles.containerMargin]}>
      {hasImage ? (
        <Touchable onPress={() => props.onFullImage(currentMessage.image)}>
          <FastImage
            source={{ uri: currentMessage.image }}
            style={[
              styles.messageImage,
              hasText ? styles.imageTextRound : styles.imageFullRound,
            ]}
            resizeMode={FastImage.resizeMode.cover}
          />
          <PhotoView source={{ uri: currentMessage.image }} style={styles.hiddenImage} />
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
          <Text
            style={[
              styles.text,
              isCurrentUser ? styles.currentUserText : styles.otherUserText,
            ]}
          >
            {currentMessage.text}
          </Text>
        </View>
      )}
    </View>
  );
};

export default MessageBubble;

import React from "react";
import FastImage from "react-native-fast-image";
import styles from "./avatar.style";

const Avatar: () => React$Node = props => {
  const {
    currentMessage: { user },
  } = props;
  return (
    <FastImage
      style={styles.avatar}
      source={
        user.avatar === null || user.avatar === undefined
          ? require("@assets/images/message-image.png")
          : typeof user.avatar === "string"
          ? { uri: user.avatar }
          : user.avatar
      }
    />
  );
};

export default Avatar;

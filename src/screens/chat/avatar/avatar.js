import React from "react";
import { Image } from "@components";
import styles from "./avatar.style";

const Avatar: () => React$Node = props => {
  const {
    currentMessage: { user },
  } = props;

  return (
    <Image
      style={styles.container}
      source={
        user.avatar !== null
          ? { uri: user.avatar }
          : require("@assets/images/message-image.png")
      }
    />
  );
};

export default Avatar;

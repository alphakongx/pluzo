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
        user.avatar === null || user.avatar === undefined
          ? require("@assets/images/message-image.png")
          : { uri: user.avatar }
      }
    />
  );
};

export default Avatar;

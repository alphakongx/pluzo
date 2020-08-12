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
        user.images.length > 0
          ? { uri: user.images[0].path }
          : require("@assets/images/message-image.png")
      }
    />
  );
};

export default Avatar;

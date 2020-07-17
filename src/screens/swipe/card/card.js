import React, { useState } from "react";
import { View } from "react-native";
import { Image } from "@components";
import styles from "./card.style";

const Card: () => React$Node = props => {
  const { card, imageIndex } = props;
  const placeholderImage = require("@assets/images/live-screen/user-temp3.png");

  var images = card.image === null ? [placeholderImage] : [card.image];
  images.concat(card.images);

  return (
    <View style={styles.card}>
      <Image
        resizeMode={"cover"}
        source={typeof(images[imageIndex]) === "string" ? { uri: images[imageIndex] } : images[imageIndex]}
        style={styles.cardImage}
      />
    </View>
  );
};

export default Card;

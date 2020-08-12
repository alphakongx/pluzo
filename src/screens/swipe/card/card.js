import React from "react";
import { Dimensions, Vibration, Platform } from "react-native";
import { Image, Touchable } from "@components";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import styles from "./card.style";

const screenWidth = Dimensions.get("window").width;
const placeholderImage = require("@assets/images/live-screen/user-temp3.png");
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: true
};

const Card: () => React$Node = props => {
  const { card, imageIndex } = props;
  var images = card.image === null ? [placeholderImage] : [card.image];
  card.images.forEach(image => {
    images.push(image.path);
  });

  return (
    <Touchable
      style={styles.card}
      activeOpacity={1}
      onPress={e => {
        if (e.nativeEvent.locationX < screenWidth / 2) {
          props.onPressItem && props.onPressItem("left");
        } else {
          props.onPressItem && props.onPressItem("right");
        }
        ReactNativeHapticFeedback.trigger("impactLight", options);
      }}
    >
      <Image
        resizeMode={"cover"}
        source={
          typeof images[imageIndex] === "string"
            ? { uri: images[imageIndex] }
            : images[imageIndex]
        }
        style={styles.cardImage}
      />
    </Touchable>
  );
};

export default Card;

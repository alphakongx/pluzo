import React from "react";
import { View } from "react-native";
import { Image, Touchable } from "@components";
import styles from "./back-button.style";

const BackButton: () => React$Node = props => {
  return (
    <Touchable onPress={props.onPress}>
      <View style={styles.container}>
        <Image source={require("@assets/images/chevron-left.png")} />
      </View>
    </Touchable>
  );
};

export default BackButton;

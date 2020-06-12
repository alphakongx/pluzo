import React from "react";
import { SafeAreaView, ImageBackground } from "react-native";
import styles from "./screen.style";

const Screen: () => React$Node = props => {
  return (
    <ImageBackground
      source={require("@assets/images/bg.png")}
      style={styles.imageBackground}
    >
      <SafeAreaView style={[styles.container, props.style]}>
        {props.children}
      </SafeAreaView>
    </ImageBackground>
  );
};

export { Screen };

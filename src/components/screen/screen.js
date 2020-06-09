import React from "react";
import { SafeAreaView, View } from "react-native";
import styles from "./screen.style";

const Screen: () => React$Node = props => {
  return (
    <View style={styles.imageBackground}>
      <SafeAreaView style={[styles.container, props.style]}>
        {props.children}
      </SafeAreaView>
    </View>
  );
};

export { Screen };

import React from "react";
import { View, ActivityIndicator } from "react-native";
import styles from "./loading.style";

const Loading: () => React$Node = props => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color={"white"} />
    </View>
  );
};

export default Loading;

import React from "react";
import { View } from "react-native";
import { Image, Text, Touchable } from "@components";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT } from "@config";

import styles from "./header.style";

const Header: () => React$Node = props => {
  return (
    <View style={styles.header}>
      <Touchable style={styles.headerButtonTouchable}>
        <Image source={require("@assets/images/live-screen/live-setting.png")} />
      </Touchable>
      <Touchable style={styles.headerButtonTouchable}>
        <Image source={require("@assets/images/live-screen/live-search.png")} />
      </Touchable>
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitle}>{"Live"}</Text>
        <View style={styles.onlineIconContainer}>
          <LinearGradient
            colors={GRADIENT.FRIEND_ONLINE_ICON}
            from={{ x: 0, y: 0 }}
            to={{ x: 1, y: 0 }}
            style={styles.onlineIcon}
          />
        </View>
      </View>
    </View>
  );
};

export default Header;

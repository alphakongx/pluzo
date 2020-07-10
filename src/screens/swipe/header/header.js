import React from "react";
import { View } from "react-native";
import { Image, Text, Touchable } from "@components";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT } from "@config";
import styles from "./header.style";

const Header: () => React$Node = props => {
  var { first_name } = props.item;

  if (first_name === null || first_name === "") {
    first_name = "No Name";
  }

  return (
    <View>
      <View style={[styles.topActionRow, styles.topRowMargin]}>
        <Text style={styles.topBarName}>{first_name}</Text>
        <LinearGradient
          colors={GRADIENT.BUTTON}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.onlineStatus}
        />
        <Text style={styles.topBarName}>21</Text>
        <View style={styles.flexSpace} />
        <Touchable
          onPress={() => {
            props.onInfoClicked(true);
          }}
        >
          <Image source={require("@assets/images/swipe-screen/info.png")} />
        </Touchable>
      </View>
      <View style={[styles.topActionRow, styles.topRowMarginSmall]}>
        <Image source={require("@assets/images/swipe-screen/location.png")} />
        <Text style={styles.topBarLocation}>LOS ANGELES, CALIFORNIA</Text>
      </View>
    </View>
  );
};

export default Header;

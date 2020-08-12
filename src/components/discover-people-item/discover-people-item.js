import React from "react";
import { View } from "react-native";
import { Image } from "../image";
import { Text } from "../text";
import { Touchable } from "../touchable";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT } from "@config";

import styles from "./discover-people-item.style";

const DiscoverPeopleItem: () => React$Node = props => {
  return (
    <View style={styles.peopleContainer}>
      <Image 
        source={require("@assets/images/live-screen/user-temp3.png")}
        style={styles.peoplePicture} />
      <LinearGradient
          colors={GRADIENT.FADE_UP}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={styles.peopleNameContainer}>
        <Text style={styles.peopleName}>ViolettaC</Text>
        <View style={styles.onlineMark} />
      </LinearGradient>
      <Touchable style={styles.peopleAddContainer}>
        <LinearGradient
          colors={GRADIENT.BUTTON}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={styles.peopleAdd}
        >
          <Image 
            source={require("@assets/images/live-screen/plus-fav.png")}
            style={styles.plusIcon} />
        </LinearGradient>
      </Touchable>
    </View>
  )
};

export default DiscoverPeopleItem;
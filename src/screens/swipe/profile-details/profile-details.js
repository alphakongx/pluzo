import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Image, Text, Touchable } from "@components";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT } from "@config";

import styles from "./profile-details.style";

const ProfileDetails: () => React$Node = props => {
  var { first_name } = props.item;

  if (first_name === null || first_name === "") {
    first_name = "No Name";
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <LinearGradient
          colors={GRADIENT.SCREEN_BACKGROUND}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.contentContainer}
        >
          <Touchable style={styles.closeButton} onPress={props.hideDetail}>
            <Image source={require("@assets/images/swipe-screen/swipe-arrow-up.png")} />
          </Touchable>
          <View style={styles.row}>
            <Text style={styles.largeText}>{first_name}</Text>
            <LinearGradient
              colors={GRADIENT.BUTTON}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.onlineStatus}
            />
            <Text style={styles.largeText}>21</Text>
            <View style={styles.flexSpace} />
            <Image source={require("@assets/images/swipe-screen/info.png")} />
            <LinearGradient
              colors={GRADIENT.BUTTON}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.followerContainer}
            >
              <Text style={styles.followerCount}>10</Text>
              <Text style={styles.followerUnit}>MI</Text>
            </LinearGradient>
          </View>
          <View style={[styles.row, styles.rowMarginTop]}>
            <Image source={require("@assets/images/swipe-screen/location.png")} />
            <Text style={styles.smallText}>LOS ANGELES, CALIFORNIA</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
              eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua.
            </Text>
          </View>
          <View style={[styles.buttonRow, styles.buttonRowMargin]}>
            <Touchable onPress={() => props.onDisLike()}>
              <Image source={require("@assets/images/swipe-screen/swipe-cross.png")} />
            </Touchable>
            <Touchable onPress={() => props.onSuperLike()}>
              <Image source={require("@assets/images/swipe-screen/swipe-star.png")} />
            </Touchable>
            <Touchable onPress={() => props.onLike()}>
              <Image source={require("@assets/images/swipe-screen/swipe-heart.png")} />
            </Touchable>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </View>
  );
};

export default ProfileDetails;

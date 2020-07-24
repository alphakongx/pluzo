import React from "react";
import { View } from "react-native";
import { Image, Text } from "@components";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT } from "@config";
import { Distance } from "@helpers";
import moment from "moment";
import styles from "./profile-detail.style";

const ProfileDetail: () => React$Node = props => {
  var { first_name, birthday, address, latitude, longitude } = props.user;
  const { location } = props;

  if (first_name === null || first_name === "") {
    first_name = "No Name";
  }
  birthday = moment.duration(moment().diff(moment.unix(birthday))).years();
  var distance = " - ";
  if (latitude !== null && longitude !== null && location !== null) {
    distance = Distance.getDistance(
      latitude,
      longitude,
      location.coords.latitude,
      location.coords.longitude,
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.topActionRow, styles.topRowMargin]}>
        <Text style={styles.topBarName}>{first_name}</Text>
        <LinearGradient
          colors={GRADIENT.BUTTON}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.onlineStatus}
        />
        <Text style={styles.topBarName}>{birthday}</Text>
        <View style={styles.flexSpace} />
        <View style={styles.iconContainer}>
          <Image
            source={require("@assets/images/swipe-screen/info.png")}
            style={styles.infoIcon}
          />
          <LinearGradient
            colors={GRADIENT.BUTTON}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={styles.distanceContainer}
          >
            <Text style={styles.distanceText}>{distance}</Text>
            <Text style={styles.distanceUnit}>MI</Text>
          </LinearGradient>
        </View>
      </View>
      <View style={[styles.topActionRow, styles.topRowMarginSmall]}>
        <Image source={require("@assets/images/swipe-screen/location.png")} />
        <Text style={styles.topBarLocation}>
          {address === null ? "no address" : address}
        </Text>
      </View>
    </View>
  );
};

export default ProfileDetail;

import React from "react";
import { View } from "react-native";
import { Image, Text, Touchable } from "@components";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT, AppBadges } from "@config";
import { Distance } from "@helpers";
import Images from "@assets/Images";
import styles from "./profile-detail.style";

const ProfileDetail: () => React$Node = props => {
  var {
    first_name,
    birthday,
    address,
    state,
    city,
    latitude,
    longitude,
    badges,
    age,
  } = props.user;
  const { location, imageIndex } = props;

  if (first_name === null || first_name === "") {
    first_name = "No Name";
  }
  birthday = age;//moment().diff(moment.unix(birthday), "years");
  var distance = " - ";
  if (latitude !== null && longitude !== null && location !== null) {
    distance = Distance.getDistance(
      latitude,
      longitude,
      location.coords.latitude,
      location.coords.longitude,
    );
  }
  let isOwner = true; //props.owner.id === (props.user.id || props.user._id);
  let strAddress = (address !== null && address !== "null") ? address : "";
  if (city !== null && state !== null) {
    strAddress = `${city}, ${state}`;
  } else {
    if (city === null && state === null) {
      strAddress = strAddress;
    } else {
      if (city === null) {
        strAddress = `${state}, ${strAddress}`;
      } else {
        strAddress = `${city}, ${strAddress}`;
      }
    }
  }
  let addresses = strAddress.split(", ");

  return (
    <View style={styles.container}>
      <View style={[styles.topActionRow, styles.topRowMargin]}>
        <Text style={styles.topBarName}>{first_name}</Text>
        <LinearGradient
          colors={GRADIENT.BUTTON}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={styles.onlineStatus}
        />
        <Text style={styles.topBarName}>{birthday}</Text>
        <View style={styles.flexSpace} />
        <View style={styles.iconContainer}>
          <Touchable onPress={() => props.onInfoClicked && props.onInfoClicked()}>
            <Image
              source={require("@assets/images/swipe-screen/info.png")}
              style={styles.infoIcon}
            />
          </Touchable>
          {!isOwner && (
            <LinearGradient
              colors={GRADIENT.BUTTON}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0 }}
              style={styles.distanceContainer}
            >
              <Text style={styles.distanceText}>{distance}</Text>
              <Text style={styles.distanceUnit}>MI</Text>
            </LinearGradient>
          )}
        </View>
      </View>
      {strAddress !== "" &&
      <View style={[styles.topActionRow, styles.topRowMarginSmall]}>
        <Image source={require("@assets/images/swipe-screen/location.png")} />
        {addresses.length > 1 && (
          <Text style={styles.topBarCity}>{addresses[0]},</Text>
        )}
        <Text style={styles.topBarLocation}>
          {addresses.length > 1 ? addresses[1] : addresses[0]}
        </Text>
      </View>}
      <View style={styles.badgeContainer}>
        {badges.map(badge => {
          if (badge > AppBadges.length) return null;
          return (
            <Image
              key={`badge-${badge}`}
              style={styles.badgeIcon}
              source={Images.badges[AppBadges[badge-1].id]}
            />
          );
        })}
      </View>
      {imageIndex === props.user.images.length && (
        <Text style={styles.bioText}>{props.user.bio}</Text>
      )}
    </View>
  );
};

export default ProfileDetail;

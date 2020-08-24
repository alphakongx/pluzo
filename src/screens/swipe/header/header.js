import React from "react";
import { View } from "react-native";
import { Image, Text, Touchable } from "@components";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT } from "@config";
import moment from "moment";
import Images from "@assets/Images";
import styles from "./header.style";

const appBadges = require("@config/data/badges.json");

const Header: () => React$Node = props => {
  var { first_name, birthday, address, badges } = props.item;

  if (first_name === null || first_name === "") {
    first_name = "No Name";
  }
  birthday = moment.duration(moment().diff(moment.unix(birthday))).years();

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
        <Text style={styles.topBarName}>{birthday}</Text>
        <View style={styles.flexSpace} />
        <Touchable
          onPress={() => {
            props.onInfoClicked(true);
          }}
        >
          <Image
            source={require("@assets/images/swipe-screen/info.png")}
            style={styles.infoIcon}
          />
        </Touchable>
      </View>
      <View style={[styles.topActionRow, styles.topRowMarginSmall]}>
        <Image source={require("@assets/images/swipe-screen/location.png")} />
        <Text style={styles.topBarLocation}>
          {address === null ? "no address" : address}
        </Text>
      </View>
      <View style={styles.badgeContainer}>
        {badges.map(badge => {
          return (
            <Image
              key={`badge-${badge}`}
              source={Images.live[appBadges[badge].icon]}
              style={styles.badgeIcon}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Header;

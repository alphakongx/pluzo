import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Image, Text, Touchable } from "@components";
import LinearGradient from "react-native-linear-gradient";
import moment from "moment";
import { GRADIENT } from "@config";
import { Distance } from "@helpers";

import styles from "./profile-details.style";

class ProfileDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var { first_name, birthday, address, bio, latitude, longitude } = this.props.item;
    const { location } = this.props;

    if (first_name === null || first_name === "") {
      first_name = "No Name";
    }
    birthday = moment.duration(moment().diff(moment.unix(birthday))).years();
    var distance = " - ";
    console.log(location);
    console.log(latitude, longitude);
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
        <SafeAreaView>
          <LinearGradient
            colors={GRADIENT.SCREEN_BACKGROUND}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.contentContainer}
          >
            <Touchable style={styles.closeButton} onPress={this.props.hideDetail}>
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
              <Text style={styles.largeText}>{birthday}</Text>
              <View style={styles.flexSpace} />
              <Image source={require("@assets/images/swipe-screen/info.png")} />
              <LinearGradient
                colors={GRADIENT.BUTTON}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.followerContainer}
              >
                <Text style={styles.followerCount}>{distance}</Text>
                <Text style={styles.followerUnit}>MI</Text>
              </LinearGradient>
            </View>
            <View style={[styles.row, styles.rowMarginTop]}>
              <Image source={require("@assets/images/swipe-screen/location.png")} />
              <Text style={styles.smallText}>
                {address === null ? "no address" : address}
              </Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionText}>{bio}</Text>
            </View>
            <View style={[styles.buttonRow, styles.buttonRowMargin]}>
              <Touchable onPress={() => this.props.onDisLike()}>
                <Image
                  source={require("@assets/images/swipe-screen/swipe-cross.png")}
                  style={styles.buttonNormal}
                />
              </Touchable>
              <Touchable onPress={() => this.props.onSuperLike()}>
                <Image
                  source={require("@assets/images/swipe-screen/swipe-star.png")}
                  style={styles.buttonSmall}
                />
              </Touchable>
              <Touchable onPress={() => this.props.onLike()}>
                <Image
                  source={require("@assets/images/swipe-screen/swipe-heart.png")}
                  style={styles.buttonNormal}
                />
              </Touchable>
            </View>
          </LinearGradient>
        </SafeAreaView>
      </View>
    );
  }
}

export default ProfileDetails;

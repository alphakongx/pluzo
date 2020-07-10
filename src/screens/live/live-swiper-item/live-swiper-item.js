import React from "react";
import { View } from "react-native";
import { Image, Text } from "@components";
import LinearGradient from "react-native-linear-gradient";
import Images from "@assets/Images";
import { GRADIENT } from "@config";

import styles from "./live-swiper-item.style";

const LiveSwiperItem: () => React$Node = props => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("@assets/images/live-screen/user-temp1.png")}
          style={styles.userImage}
        />
        <Image
          source={require("@assets/images/live-screen/user-temp2.png")}
          style={styles.userImage}
        />
        <Image
          source={require("@assets/images/live-screen/user-temp1.png")}
          style={styles.userImage}
        />
        <Image
          source={require("@assets/images/live-screen/user-temp2.png")}
          style={styles.userImage}
        />
        <Image
          source={require("@assets/images/live-screen/user-temp2.png")}
          style={styles.userImage}
        />
        <Image
          source={require("@assets/images/live-screen/user-temp1.png")}
          style={styles.userImage}
        />
        <Image
          source={require("@assets/images/live-screen/user-temp2.png")}
          style={styles.userImage}
        />
        <Image
          source={require("@assets/images/live-screen/user-temp1.png")}
          style={styles.userImage}
        />
      </View>
      <LinearGradient
        colors={GRADIENT.FADE_UP}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.dataContainer}
      >
        <View style={styles.tagContainer}>
          <LinearGradient
            colors={GRADIENT.BUTTON}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.membersContainer}
          >
            <Image
              source={require("@assets/images/live-screen/live-user.png")}
              style={styles.memberIcon}
            />
            <Text style={styles.memberCount}>11</Text>
          </LinearGradient>
          <Image source={Images.live.tagLove} style={styles.tagImage} />
          <Image source={Images.live.tagSea} style={styles.tagImage} />
          <Image source={Images.live.tagTravel} style={styles.tagImage} />
        </View>
        <Text style={styles.userName} numberOfLines={1}>
          Lara, Daniel, XZeroX, Cody, Fredriction
        </Text>
      </LinearGradient>
    </View>
  );
};

export default LiveSwiperItem;

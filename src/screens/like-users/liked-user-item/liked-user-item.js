import React from "react";
import { View } from "react-native";
import { Text } from "@components";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT, AppBadges } from "@config";
import { Format } from "@helpers";
import Images from "@assets/Images";

import styles from "./liked-user-item.style";

const LikedUserItem: () => React$Node = props => {
  const { user } = props.user;

  return (
    <View style={styles.container}>
      <FastImage
        source={{ uri: user.images[0].path }}
        style={styles.userImage}
        resizeMode={FastImage.resizeMode.cover}
      />

      <View style={styles.badgesContainer}>
        {user.badges.map(badge => {
          if (badge > AppBadges.length) return null;
          return (
            <FastImage
              key={`profile-badge-${badge}`}
              source={Images.live[AppBadges[badge].icon]}
              style={styles.badgeIcon}
            />
          );
        })}
      </View>

      <View style={styles.bottomContainer}>
        <LinearGradient
          colors={GRADIENT.FADE_UP}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradientBack}
        />
        <Text style={styles.nameText}>{user.first_name}</Text>
        {Format.isRecently(user.last_activity) && (
          <View style={styles.recentlyContainer}>
            <View style={styles.recentlyMark} />
            <Text style={styles.recentlyText}>Recently Active</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default LikedUserItem;

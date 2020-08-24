import React from "react";
import { View, ActivityIndicator } from "react-native";
import FastImage from "react-native-fast-image";
import { Image, Text, UserCount, Touchable } from "@components";
import Images from "@assets/Images";
import styles from "./user-profile.style";

const appBadges = require("@config/data/badges.json");

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user, loading } = this.props;

    var userImage = require("@assets/images/live-screen/user-temp3.png");
    var name = "no name";
    if (user !== null) {
      if (user.images.length > 0) {
        userImage = { uri: user.images[0].path };
      }
      if (user.first_name !== null) {
        name = user.first_name;
      }
    }

    return (
      <View style={styles.userContainer}>
        <Touchable onPress={this.props.onAvatarClick}>
          <FastImage source={userImage} style={styles.avatarImage} />
          {loading && (
            <View style={styles.absoluteFill}>
              <ActivityIndicator size={"small"} color={"white"} />
            </View>
          )}
        </Touchable>
        <View style={styles.textContainer}>
          <View style={styles.nameContainer}>
            <Touchable onPress={this.props.onNameClick}>
              <Text style={styles.nameText}>{name}</Text>
            </Touchable>
            {user.badges.map(badge => {
              return (
                <Image
                  key={`profile-badge-${badge}`}
                  source={Images.live[appBadges[badge].icon]}
                  style={styles.badgeImage}
                />
              );
            })}
          </View>
          <Text style={styles.usernameText}>{user !== null ? user.username : ""}</Text>
          <UserCount
            count={parseInt(user.friends, 10)}
            style={styles.friendsContainer}
            iconStyle={styles.friendsIconImage}
            textStyle={styles.friendsCountText}
          />
        </View>
      </View>
    );
  }
}

export default UserProfile;

import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Image, Text, UserCount, Touchable } from "@components";
import Images from "@assets/Images";
import styles from "./user-profile.style";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user, loading } = this.props;

    var userImage = require("@assets/images/live-screen/user-temp3.png");
    var name = "no name";
    if (user !== null) {
      if (user.image !== null) {
        userImage = { uri: user.image };
      }
      if (user.first_name !== null) {
        name = user.first_name;
      }
    }

    return (
      <View style={styles.userContainer}>
        <Touchable onPress={this.props.onAvatarClick}>
          <Image source={userImage} style={styles.avatarImage} />
          {loading && (
            <View style={styles.absoluteFill}>
              <ActivityIndicator size={"small"} color={"white"} />
            </View>
          )}
        </Touchable>
        <View style={styles.textContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>{name}</Text>
            <Image source={Images.live.tagLove} style={styles.badgeImage} />
            <Image source={Images.live.tagBox} style={styles.badgeImage} />
          </View>
          <Text style={styles.usernameText}>{user !== null ? user.username : ""}</Text>
          <UserCount
            count={1734}
            style={styles.friendsContainer}
            iconStyle={styles.friendsIconImage}
            textStyle={styles.friendsCountText}
          />
        </View>
      </View>
    );
  }
}

export default Header;

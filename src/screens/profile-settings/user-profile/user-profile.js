import React from "react";
import { View } from "react-native";
import { Image, Text, UserCount } from "@components";
import Images from "@assets/Images";
import styles from "./user-profile.style";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.userContainer}>
        <Image
          source={require("@assets/images/live-screen/user-temp3.png")}
          style={styles.avatarImage}
        />
        <View style={styles.textContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>Lara Cruse</Text>
            <Image source={Images.live.tagLove} style={styles.badgeImage} />
            <Image source={Images.live.tagBox} style={styles.badgeImage} />
          </View>
          <Text style={styles.usernameText}>@larac.97</Text>
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

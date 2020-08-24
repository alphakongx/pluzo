import React from "react";
import { FlatList, View } from "react-native";
import { Image, Text, Touchable } from "@components";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";

import { GRADIENT } from "@config";
import { NavigationService } from "@helpers";
import { SCREENS } from "@constants";
import styles from "./new-friends.style";

const placeHolder = require("@assets/images/live-screen/user-temp3.png");

class NewFriends extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.requestFriends();
    this.props.navigation.addListener("willFocus", this.requestFriends);
  }

  requestFriends = () => {
    this.props.loadFriends(this.props.token);
  };

  onFriendClick = friend => {
    NavigationService.navigate(SCREENS.CHAT, { chatUser: friend });
  };

  render() {
    const { friends } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{"New Friends!"}</Text>
        <FlatList
          horizontal
          style={styles.friendsList}
          contentContainerStyle={styles.friendsListContentContainerStyle}
          data={friends}
          keyExtractor={item => item.id}
          renderItem={({ item: friend, index }) => (
            <Touchable
              onPress={() => {
                this.onFriendClick(friend);
              }}
            >
              <View style={styles.friendItemContainer}>
                <FastImage
                  source={
                    friend.images[0] === null
                      ? placeHolder
                      : { uri: friend.images[0].path }
                  }
                  style={styles.friendImage}
                />
                {friend.premium === 1 ? (
                  <View style={styles.favouriteIcon}>
                    <Image source={require("@assets/images/favourite.png")} />
                  </View>
                ) : null}
                {friend.online ? (
                  <View style={styles.onlineIconContainer}>
                    <LinearGradient
                      colors={GRADIENT.FRIEND_ONLINE_ICON}
                      from={{ x: 0, y: 0 }}
                      to={{ x: 1, y: 0 }}
                      style={styles.onlineIcon}
                    />
                  </View>
                ) : null}
              </View>
            </Touchable>
          )}
          // ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        />
      </View>
    );
  }
}

export default NewFriends;

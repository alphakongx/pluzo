import React from "react";
import { FlatList, Platform, View } from "react-native";
import { Image, Text, Touchable } from "@components";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";
import { BlurView } from "@react-native-community/blur";

import PurchaseModal from "../../profile-settings/purchase-modal";
import { GRADIENT } from "@config";
import { NavigationService } from "@helpers";
import { SCREENS } from "@constants";
import styles from "./new-friends.style";

const placeHolder = require("@assets/images/live-screen/user-temp3.png");

class NewFriends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visiblePurchase: false,
    }
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
    const { user, friends } = this.props;
    let sortedFriends = friends.sort((a, b) => b.flag - a.flag);
    let allFriends = [user, ...sortedFriends];
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{"New Friends!"}</Text>
        <FlatList
          horizontal
          style={styles.friendsList}
          contentContainerStyle={styles.friendsListContentContainerStyle}
          data={allFriends}
          keyExtractor={item => `friends-${item.id}`}
          renderItem={({ item: friend, index }) => {
            if (parseInt(friend.id, 10) === parseInt(user.id, 10)) {
              return (
                <Touchable
                  onPress={() => {
                    if (user.premium === 1) {
                      this.props.navigation.navigate(SCREENS.LIKE_USERS);
                    } else {
                      this.setState({visiblePurchase: true});
                    }
                  }}
                >
                  <View style={styles.friendItemContainer}>
                    <FastImage
                      source={
                        friend.images[0] === null
                          ? placeHolder
                          : { uri: friend.images[0].path }
                      }
                      style={[styles.friendImage, styles.greenBorder]}
                    />
                    <View style={styles.imageBlurContainer}>
                      {Platform.OS === "ios" && (
                        <BlurView
                          style={styles.imageBlur}
                          blurType={"light"}
                          blurAmount={2}
                        />
                      )}
                      {Platform.OS === "android" && <View style={styles.imageBlurView} />}
                    </View>
                    <View style={styles.heartIcon}>
                      <Image source={require("@assets/images/heart.png")} />
                    </View>
                    <Text style={styles.likeCount}>{`${
                      friend.likes === undefined ? 0 : friend.likes.like_sum
                    } Likes`}</Text>
                  </View>
                </Touchable>
              );
            } else {
              return (
                <Touchable
                  onPress={() => {
                    if (friend.flag === 1 || friend.flag === 3) {
                      this.props.onReadFlag(friend.id);
                    }
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
                    {(friend.flag === 2 || friend.flag === 3) ? (
                      <View style={styles.favouriteIcon}>
                        <Image source={require("@assets/images/favourite.png")} />
                      </View>
                    ) : null}
                    {friend.flag === 1 ? (
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
              );
            }
          }}
          // ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        />
        <PurchaseModal
          isVisible={this.state.visiblePurchase}
          onSwipeComplete={() => this.setState({visiblePurchase: false})}
        />
      </View>
    );
  }
}

export default NewFriends;

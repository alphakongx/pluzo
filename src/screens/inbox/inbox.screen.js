import React, { Component } from "react";
import { SafeAreaView, View } from "react-native";
import { Image, Text, Touchable } from "@components";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT } from "@config";
import NewFriends from "./new-friends";
import Messages from "./messages";
import AddFriendModal from "./add-friend-modal";
import PendingRequestModal from "./pending-request-modal";
import { SCREENS } from "@constants";

import styles from "./inbox.style.js";

class Inbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleAddFriend: false,
      visiblePendingRequest: false,
    };
  }

  onPendingRequest = () => {
    this.setState({ visibleAddFriend: false }, () => {
      setTimeout(() => {
        this.setState({ visiblePendingRequest: true });
      }, 500);
    });
  };

  onSearch = () => {
    this.props.navigation.navigate(SCREENS.SEARCH);
  };

  render() {
    const { visibleAddFriend, visiblePendingRequest } = this.state;
    return (
      <LinearGradient
        colors={GRADIENT.SCREEN_BACKGROUND}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeAreaContainer}>
          <View style={styles.viewContainer}>
            <View style={styles.header}>
              <Touchable onPress={this.onSearch} style={styles.searchFieldContainer}>
                <View style={styles.searchIconContainer}>
                  <Image source={require("@assets/images/search.png")} />
                </View>
                <Text style={styles.searchText}>{"Search"}</Text>
              </Touchable>

              <View style={styles.newChatIconContainer}>
                <Touchable onPress={() => this.setState({ visibleAddFriend: true })}>
                  <Image source={require("@assets/images/new-chat.png")} />
                </Touchable>
              </View>
            </View>
            <View style={styles.contentContainer}>
              <NewFriends navigation={this.props.navigation} />
              <View style={styles.separator} />
              <Messages
                navigation={this.props.navigation}
                onPressItem={(chatId, chatUser) => {
                  this.props.navigation.navigate(SCREENS.CHAT, { chatId, chatUser });
                }}
              />
            </View>
          </View>
        </SafeAreaView>

        <AddFriendModal
          isVisible={visibleAddFriend}
          dismissModal={() => this.setState({ visibleAddFriend: false })}
          pendingRequest={() => this.onPendingRequest()}
        />

        <PendingRequestModal
          isVisible={visiblePendingRequest}
          dismissModal={() => this.setState({ visiblePendingRequest: false })}
          pendingRequest={() => this.onPendingRequest()}
        />
      </LinearGradient>
    );
  }
}

export default Inbox;

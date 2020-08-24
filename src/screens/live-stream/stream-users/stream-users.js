import React, { Component } from "react";
import { View, ScrollView, SafeAreaView, Animated, Easing } from "react-native";
import { Image, Touchable, Text, BorderButton, Screen } from "@components";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT } from "@config";
import Images from "@assets/Images";

import styles from "./stream-users.style";
import StreamUserIcon from "../stream-user-icon/stream-user-icon";

class StreamUsers extends Component {
  constructor(props) {
    super(props);
    this.slideAnim = new Animated.Value(250);
  }

  componentDidMount() {
    Animated.timing(this.slideAnim, {
      toValue: 0,
      duration: 250,
      easing: Easing.in(Easing.ease),
      useNativeDriver: false,
    }).start();
  }

  onBack = () => {
    Animated.timing(this.slideAnim, {
      toValue: 250,
      duration: 250,
      easing: Easing.in(Easing.ease),
      useNativeDriver: false,
    }).start(() => {
      this.props.setShowUsers(false);
      this.props.setIsScrolling(false);
    });
  };

  render() {
    let broadcasters = [];
    let audiences = [];
    if (this.props.currentStream !== null) {
      broadcasters = this.props.currentStream.broadcasters;
      audiences = this.props.currentStream.audience;
    }

    return (
      <Animated.View
        style={[styles.container, { transform: [{ translateX: this.slideAnim }] }]}
      >
        <Screen hasGradient style={styles.safeAreaContainer}>
          <SafeAreaView style={styles.flexFill}>
            <View style={styles.header}>
              <Touchable
                style={styles.headerButtonTouchable}
                onPress={this.props.onReport}
              >
                <Image source={require("@assets/images/report.png")} />
              </Touchable>
              <View style={styles.headerTitleContainer}>
                <Text style={styles.headerTitle}>{"Live"}</Text>
                <View style={styles.onlineIconContainer}>
                  <LinearGradient
                    colors={GRADIENT.FRIEND_ONLINE_ICON}
                    from={{ x: 0, y: 0 }}
                    to={{ x: 1, y: 0 }}
                    style={styles.onlineIcon}
                  />
                </View>
              </View>
            </View>

            <BorderButton text={"Invite friends"} onPress={this.props.onInviteFriends} />

            <ScrollView style={styles.scrollView} onMoveShouldSetResponder={() => true}>
              {/** stream users */}
              <View style={styles.flexRow}>
                <View style={styles.streamerMark} />
                <Text
                  style={styles.streamerText}
                >{`${broadcasters.length} Streamer`}</Text>
              </View>
              {broadcasters.map((user, index) => {
                return (
                  <View key={"stream" + user.id} style={styles.userContainer}>
                    <StreamUserIcon user={user} />
                    <View style={styles.nameTextContainer}>
                      <Text style={styles.nameText}>{user.name}</Text>
                      <Text style={styles.usernameText}>{user.username}</Text>
                    </View>
                  </View>
                );
              })}

              {/** viewers */}
              <View style={styles.flexRow}>
                <Image source={Images.live.icEye} />
                <Text style={styles.streamerText}>{`${audiences.length} Viewer`}</Text>
              </View>
              {audiences.map((user, index) => {
                return (
                  <View key={"viewer" + user.id} style={styles.userContainer}>
                    <StreamUserIcon isStreamer={false} user={user} />
                    <View style={styles.nameTextContainer}>
                      <Text style={styles.nameText}>{user.name}</Text>
                      <Text style={styles.usernameText}>{user.username}</Text>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </SafeAreaView>
        </Screen>
        <Touchable style={styles.flexFill} onPress={this.onBack} />
      </Animated.View>
    );
  }
}

export default StreamUsers;

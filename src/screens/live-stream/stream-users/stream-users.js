import React, { Component } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import { Image, Touchable, Text, BorderButton } from "@components";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT } from "@config";
import Images from "@assets/Images";

import styles from "./stream-users.style";
import StreamUserIcon from "../stream-user-icon/stream-user-icon";

class StreamUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      streamUsers: [
        {
          id: "1",
          name: "William",
          username: "@williammm",
          avatar: require("@assets/images/live-screen/user-temp3.png"),
        },
        {
          id: "2",
          name: "ViolettaC",
          username: "@xvioletta1",
          avatar: require("@assets/images/live-screen/user-temp4.png"),
        },
        {
          id: "3",
          name: "HannahX",
          username: "@hannah_x_",
          avatar: require("@assets/images/live-screen/user-temp2.png"),
        },
        {
          id: "4",
          name: "Cody79",
          username: "@codycool79",
          avatar: require("@assets/images/live-screen/user-temp1.png"),
        },
        {
          id: "5",
          name: "Lara Cruse",
          username: "@larac.97",
          avatar: require("@assets/images/live-screen/user-temp4.png"),
        },
      ],
      viewers: [
        {
          id: "1",
          name: "William",
          username: "@williammm",
          avatar: require("@assets/images/live-screen/user-temp3.png"),
        },
        {
          id: "2",
          name: "ViolettaC",
          username: "@xvioletta1",
          avatar: require("@assets/images/live-screen/user-temp4.png"),
        },
        {
          id: "3",
          name: "HannahX",
          username: "@hannah_x_",
          avatar: require("@assets/images/live-screen/user-temp2.png"),
        },
        {
          id: "4",
          name: "Cody79",
          username: "@codycool79",
          avatar: require("@assets/images/live-screen/user-temp1.png"),
        },
        {
          id: "5",
          name: "Lara Cruse",
          username: "@larac.97",
          avatar: require("@assets/images/live-screen/user-temp2.png"),
        },
        {
          id: "6",
          name: "Cody79",
          username: "@codycool79",
          avatar: require("@assets/images/live-screen/user-temp3.png"),
        },
        {
          id: "7",
          name: "Lara Cruse",
          username: "@larac.97",
          avatar: require("@assets/images/live-screen/user-temp4.png"),
        },
        {
          id: "8",
          name: "Cody79",
          username: "@codycool79",
          avatar: require("@assets/images/live-screen/user-temp1.png"),
        },
        {
          id: "9",
          name: "Lara Cruse",
          username: "@larac.97",
          avatar: require("@assets/images/live-screen/user-temp2.png"),
        },
      ],
    };
  }

  render() {
    const { streamUsers, viewers } = this.state;
    return (
      <LinearGradient
        colors={GRADIENT.SCREEN_BACKGROUND}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeAreaContainer}>
          <View style={styles.header}>
            <Touchable 
              style={styles.headerButtonTouchable}
              onPress={this.props.onReport}>
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

          <BorderButton text={"Invite friends"}
            onPress={this.props.onInviteFriends} />

          <ScrollView style={styles.scrollView}>
            {/** stream users */}
            <View style={styles.flexRow}>
              <View style={styles.streamerMark} />
              <Text style={styles.streamerText}>{"5 Streamer"}</Text>
            </View>
            {streamUsers.map((user, index) => {
              return (
                <View key={"stream" + user.id} style={styles.userContainer}>
                  <StreamUserIcon icon={user.avatar} />
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
              <Text style={styles.streamerText}>{"126 Viewer"}</Text>
            </View>
            {viewers.map((user, index) => {
              return (
                <View key={"viewer" + user.id} style={styles.userContainer}>
                  <StreamUserIcon isStreamer={false} icon={user.avatar} />
                  <View style={styles.nameTextContainer}>
                    <Text style={styles.nameText}>{user.name}</Text>
                    <Text style={styles.usernameText}>{user.username}</Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

export default StreamUsers;

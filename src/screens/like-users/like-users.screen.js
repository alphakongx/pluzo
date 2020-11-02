import React, { Component } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { Screen, BackButton, Image, Text, Touchable } from "@components";
import { SCREENS } from "@constants";
import { getLikedUsers } from "@redux/api";

import LikedUserItem from "./liked-user-item";
import styles from "./like-users.style";

class LikeUsersScreen extends Component {
  constructor(props) {
    super(...arguments);
    this.state = {
      likedUsers: [],
    };
  }

  componentDidMount() {
    getLikedUsers(this.props.token).then(response => {
      this.setState({ likedUsers: response.data.data });
    });
  }

  render() {
    const { likedUsers } = this.state;
    return (
      <Screen hasGradient style={styles.container}>
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <BackButton onPress={() => this.props.navigation.goBack()} />
              <View style={styles.headerTitleContainer} pointerEvents={"none"}>
                <Image
                  source={require("@assets/images/heart.png")}
                  style={styles.headerIcon}
                />
                <Text style={styles.headerText}>{`${likedUsers.length} Likes`}</Text>
              </View>
            </View>

            <FlatList
              style={styles.listContainer}
              data={likedUsers}
              numColumns={2}
              keyExtractor={(item, index) => `liked-user-${index}`}
              ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
              renderItem={({ item: likedUser, index }) => {
                return (
                  <Touchable
                    onPress={() => {
                      this.props.navigation.navigate(SCREENS.PROFILE_VIEW, {
                        user: likedUser.user,
                      });
                    }}
                  >
                    <LikedUserItem user={likedUser} />
                  </Touchable>
                );
              }}
            />
          </View>
        </SafeAreaView>
      </Screen>
    );
  }
}

export default LikeUsersScreen;

import React from "react";
import { FlatList } from "react-native";
import { Image, Touchable } from "@components";
import { NavigationService } from "@helpers";
import { SCREENS } from "@constants";

import data from "./live-users.json";
import styles from "./live-users.style";

const LiveUsers: () => React$Node = props => {
  return (
    <FlatList
      horizontal
      style={styles.usersList}
      contentContainerStyle={styles.usersListContentContainerStyle}
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item: user, index }) => (
        <Touchable
          key={`live-user-${index}`}
          style={styles.itemContainer}
          onPress={() => {
            NavigationService.navigate(SCREENS.LIVE_STREAM, {
              channelName: "channel-35",
              isBroadcaster: true,
            });
          }}
        >
          <Image source={require("./data/friend-1.png")} style={styles.itemImage} />
        </Touchable>
      )}
    />
  );
};

export default LiveUsers;

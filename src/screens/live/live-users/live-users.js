import React from "react";
import { FlatList, View } from "react-native";
import { Image, Touchable, BoxShadow } from "@components";
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
          <View>
            <BoxShadow setting={{
              width: 50,
              height: 50,
              color: "#00FFF6",
              opacity: 0.36,
              _borderRadius: 25,
              spread: 0,
              blur: 10,
              offsetX: 0,
              offsetY: 0,
            }}/>
            <Image source={require("@assets/images/live-screen/user-temp1.png")} style={styles.itemImage} />
          </View>
        </Touchable>
      )}
    />
  );
};

export default LiveUsers;

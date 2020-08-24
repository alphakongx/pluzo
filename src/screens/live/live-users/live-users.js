import React from "react";
import { FlatList, View } from "react-native";
import FastImage from "react-native-fast-image";
import { Touchable, BoxShadow } from "@components";
import EventBus from "eventing-bus";

import styles from "./live-users.style";

const LiveUsers: () => React$Node = props => {
  return (
    <FlatList
      horizontal
      style={styles.usersList}
      contentContainerStyle={styles.usersListContentContainerStyle}
      data={props.streamUsers}
      keyExtractor={item => item.channel}
      renderItem={({ item: item, index }) => (
        <Touchable
          style={styles.itemContainer}
          onPress={() => {
            let params = {
              channelName: item.channel,
              isBroadcaster: false,
              isJoin: true,
            };
            EventBus.publish("NEW_STREAM_ACTION", params);
          }}
        >
          <View>
            <BoxShadow
              setting={{
                width: 50,
                height: 50,
                color: "#00FFF6",
                opacity: 0.36,
                _borderRadius: 25,
                spread: 0,
                blur: 10,
                offsetX: 0,
                offsetY: 0,
              }}
            />
            <FastImage
              source={{ uri: item.user.images[0].path }}
              style={styles.itemImage}
            />
          </View>
        </Touchable>
      )}
    />
  );
};

export default LiveUsers;

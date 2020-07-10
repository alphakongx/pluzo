import React from "react";
import { FlatList, View } from "react-native";
import { Image } from "@components";

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
        <View style={styles.itemContainer} key={index}>
          <Image source={require("./data/friend-1.png")} style={styles.itemImage} />
        </View>
      )}
    />
  );
};

export default LiveUsers;

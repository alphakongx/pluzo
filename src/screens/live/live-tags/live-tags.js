import React from "react";
import { FlatList, View } from "react-native";
import { Image, Text } from "@components";
import Images from "@assets/Images";

import styles from "./live-tags.style";

const LiveTags: () => React$Node = props => {
  let data = [
    { type: "all", icon: null },
    { type: "picture", icon: Images.live.tagPicture },
    { type: "music", icon: Images.live.tagMusic },
    { type: "box", icon: Images.live.tagBox },
    { type: "love", icon: Images.live.tagLove },
    { type: "sport", icon: Images.live.tagSport },
    { type: "sea", icon: Images.live.tagSea },
    { type: "travel", icon: Images.live.tagTravel },
  ];

  return (
    <FlatList
      horizontal
      style={styles.usersList}
      contentContainerStyle={styles.usersListContentContainerStyle}
      data={data}
      keyExtractor={item => item.type}
      renderItem={({ item: tag, index }) => (
        <View style={styles.itemContainer} key={index}>
          {tag.type === "all" && (
            <View style={[styles.itemTextContainer, styles.activeItem]}>
              <Text style={styles.itemText}>{"ALL"}</Text>
            </View>
          )}
          {tag.type !== "all" && (
            <View style={styles.itemImageContainer}>
              <Image source={tag.icon} style={styles.itemImage} />
            </View>
          )}
        </View>
      )}
    />
  );
};

export default LiveTags;

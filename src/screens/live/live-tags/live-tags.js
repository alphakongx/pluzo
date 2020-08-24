import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { Image, Text, Touchable } from "@components";
import Images from "@assets/Images";

import styles from "./live-tags.style";

const data = [
  { type: "all", icon: null },
  { type: "picture", icon: Images.live.tagPicture },
  { type: "music", icon: Images.live.tagMusic },
  { type: "box", icon: Images.live.tagBox },
  { type: "love", icon: Images.live.tagLove },
  { type: "sport", icon: Images.live.tagSport },
  { type: "sea", icon: Images.live.tagSea },
  { type: "travel", icon: Images.live.tagTravel },
];

const LiveTags: () => React$Node = props => {
  const [currentTag, setCurrentTag] = useState("all");

  const onChangeTag = tag => {
    setCurrentTag(tag.type);
  };

  return (
    <FlatList
      horizontal
      style={styles.usersList}
      contentContainerStyle={styles.usersListContentContainerStyle}
      data={data}
      keyExtractor={item => item.type}
      renderItem={({ item: tag, index }) => {
        let isActive = currentTag === tag.type;
        return (
          <Touchable style={styles.itemContainer} onPress={() => onChangeTag(tag)}>
            {tag.type === "all" && (
              <View style={[styles.itemTextContainer, isActive ? styles.activeItem : {}]}>
                <Text style={styles.itemText}>{"ALL"}</Text>
              </View>
            )}
            {tag.type !== "all" && (
              <View
                style={[styles.itemImageContainer, isActive ? styles.activeItem : {}]}
              >
                <Image source={tag.icon} style={styles.itemImage} />
              </View>
            )}
          </Touchable>
        );
      }}
    />
  );
};

export default LiveTags;

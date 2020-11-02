import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { Image, Text, Touchable } from "@components";
import Images from "@assets/Images";

import styles from "./live-tags.style";

const badges = require("@config/data/badges.json");

const LiveTags: () => React$Node = props => {
  const [currentTag, setCurrentTag] = useState(0);

  const data = [{ id: 0, icon: null, selected: false }];
  Object.values(badges).forEach(value => {
    data.push(value);
  });

  const onChangeTag = tag => {
    setCurrentTag(tag.id);
    props.onChangeCategory && props.onChangeCategory(tag.id);
  };

  return (
    <FlatList
      horizontal
      style={styles.usersList}
      contentContainerStyle={styles.usersListContentContainerStyle}
      data={data}
      keyExtractor={item => `live-category-${item.id}`}
      renderItem={({ item: tag, index }) => {
        let isActive = currentTag === tag.id;
        return (
          <Touchable style={styles.itemContainer} onPress={() => onChangeTag(tag)}>
            {tag.id === 0 && (
              <View style={[styles.itemTextContainer, isActive ? styles.activeItem : {}]}>
                <Text style={styles.itemText}>{"ALL"}</Text>
              </View>
            )}
            {tag.id !== 0 && (
              <View
                style={[styles.itemImageContainer, isActive ? styles.activeItem : {}]}
              >
                <Image source={Images.live[tag.icon]} style={styles.itemImage} />
              </View>
            )}
          </Touchable>
        );
      }}
    />
  );
};

export default LiveTags;

import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { Image, Text, Touchable } from "@components";
import { AppTags } from "@config";
import Images from "@assets/Images";

import styles from "./live-tags.style";
import LinearGradient from "react-native-linear-gradient";

const LiveTags: () => React$Node = props => {
  const [currentTag, setCurrentTag] = useState(0);

  const data = [{ id: 0, icon: null, selected: false }];
  Object.values(AppTags).forEach(value => {
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
      showsHorizontalScrollIndicator={false}
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
              <LinearGradient
                colors={Object.values(tag.color)}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 1}}
                style={[styles.itemImageContainer, isActive ? styles.activeItem : {}]}
              >
                <Text style={[styles.itemText, {textShadowColor: tag.shadowColor}]}>{tag.name}</Text>
                {tag.icon && 
                <Image
                  source={Images.live[tag.icon]} 
                  style={[
                      tag.id === 1 ? styles.itemImage1 : styles.itemImage,
                      tag.id === 3 && { top: 3 },
                    ]} />}
              </LinearGradient>
            )}
          </Touchable>
        );
      }}
    />
  );
};

export default LiveTags;

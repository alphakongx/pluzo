import React from "react";
import { View } from "react-native";
import { Screen, Text, Image, Touchable } from "@components";
import LinearGradient from "react-native-linear-gradient";
import { AppTags } from "@config";
import Images from "@assets/Images";

import styles from "./stream-emoji-view.style";

const StreamEmojiView: () => React$Node = props => {

  const data = [];
  Object.values(AppTags).forEach(value => {
    data.push(value);
  });

  const onChangeEmoji = item => {
    props.onChangeEmoji && props.onChangeEmoji(item);
  };

  return (
    <View>
      <Screen hasGradient style={styles.container}>
        <Text style={styles.trendingText}>Categories</Text>
        <View style={styles.iconsContainer}>
          {data.map(item => {
            return (
              <Touchable
                key={`trending-${item.id}`}
                style={styles.emojiButton}
                onPress={() => onChangeEmoji(item)}
              >
                <LinearGradient
                  colors={Object.values(item.color)}
                  start={{x: 1, y: 0}}
                  end={{x: 0, y: 1}}
                  style={styles.itemColorView}>
                  <Text style={[styles.itemText, {textShadowColor: item.shadowColor}]}>{item.name}</Text>
                  {item.icon && 
                  <Image
                    source={Images.live[item.icon]} 
                    style={[
                      item.id === 1 ? styles.itemImage1 : styles.itemImage,
                      item.id === 3 && { top: 3 },
                      ]} />}
                </LinearGradient>
              </Touchable>
            );
          })}
        </View>     
      </Screen>
    </View>
  );
};

export default StreamEmojiView;

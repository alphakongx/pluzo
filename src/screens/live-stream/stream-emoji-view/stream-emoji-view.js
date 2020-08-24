import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { GradientButton, Screen, Text, Image, Touchable } from "@components";
import LinearGradient from "react-native-linear-gradient";
import Images from "@assets/Images";

import styles from "./stream-emoji-view.style";

const StreamEmojiView: () => React$Node = props => {
  const [expandCategory, setExpandCategory] = useState(false);

  return (
    <View>
      <Screen hasGradient style={styles.container}>
        <Text style={styles.trendingText}>Trending</Text>
        <View style={styles.iconsContainer}>
          {[1, 2, 3, 4, 5, 6].map(item => {
            return (
              <Touchable key={`trending-${item}`} style={styles.emojiButton}>
                <Image
                  source={require("@assets/images/live-screen/ic-category-tmp.png")}
                />
              </Touchable>
            );
          })}
        </View>
        {!expandCategory && <View style={styles.spacerView} />}
        {expandCategory && <Text style={styles.trendingText}>All</Text>}
        {expandCategory && (
          <ScrollView style={styles.allContainer}>
            <View style={styles.iconsContainer}>
              {[
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12,
                13,
                14,
                15,
                16,
                17,
                18,
                19,
                20,
                21,
                22,
                23,
                24,
                25,
                26,
                27,
                28,
                29,
                30,
              ].map(item => {
                return (
                  <Touchable
                    key={`trending-${item}`}
                    style={styles.emojiButton}
                    onPress={() => console.log("ok")}
                  >
                    <Image
                      source={require("@assets/images/live-screen/ic-category-tmp.png")}
                    />
                  </Touchable>
                );
              })}
            </View>
          </ScrollView>
        )}
      </Screen>
      {expandCategory && (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.fadeContainer}
          colors={["rgba(26, 2, 62, 0.18)", "rgba(26, 2, 62, 1)"]}
          pointerEvents={"none"}
        />
      )}
      <View style={styles.expandButtonContainer}>
        <GradientButton
          onPress={() => setExpandCategory(!expandCategory)}
          containerStyle={styles.expandButton}
          icon={expandCategory ? Images.app.icBackUp : Images.app.icBack}
          iconStyle={styles.expandIcon}
          text={"test"}
        />
      </View>
    </View>
  );
};

export default StreamEmojiView;

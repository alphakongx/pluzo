import React from "react";
import { View } from "react-native";
import { Image, Text, VerticalImagesLayout } from "@components";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT, AppTags } from "@config";
import Images from "@assets/Images";

import styles from "./live-item.styles";

const LiveItem: () => React$Node = props => {
  const { item } = props;

  return (
    <View>
      <VerticalImagesLayout images={item.info.streamers_images} />
      <View style={styles.itemDataContainer}>
        <Text style={styles.userName} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.tagContainer}>
          <LinearGradient
            colors={GRADIENT.BUTTON}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.membersContainer}
          >
            <Image
              source={require("@assets/images/live-screen/live-user.png")}
              style={styles.memberIcon}
            />
            <Text style={styles.memberCount}>{parseInt(item.count, 10)}</Text>
          </LinearGradient>
          {parseInt(item.category, 10) !== 0 && parseInt(item.category, 10) < 7 && (
            <View style={styles.tagImages}>
              <LinearGradient
                colors={Object.values(AppTags[item.category].color)}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.itemColorView}
              >
                <Text
                  style={[
                    styles.itemText,
                    { textShadowColor: AppTags[item.category].shadowColor },
                  ]}
                >
                  {AppTags[item.category].name}
                </Text>
              </LinearGradient>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default LiveItem;

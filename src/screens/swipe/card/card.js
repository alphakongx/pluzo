import React, { useState } from "react";
import { Dimensions, View, SafeAreaView } from "react-native";
import FastImage from "react-native-fast-image";
import { Touchable, CardProgressBar } from "@components";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT } from "@config";
import Header from "../header";

import styles from "./card.style";

const screenWidth = Dimensions.get("window").width;
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: true,
};

const Card: () => React$Node = props => {
  const [imageIndex, setImageIndex] = useState(0);
  const { card } = props;
  let isBio = card.bio !== undefined && card.bio !== null && card.bio !== "";

  FastImage.preload(card.images.map(item => ({ uri: item.path })));

  return (
    <Touchable
      style={styles.container}
      activeOpacity={1}
      onPress={e => {
        let newIndex = 0;
        if (e.nativeEvent.locationX < screenWidth / 2) {
          // left
          newIndex =
            imageIndex === 0
              ? isBio
                ? card.images.length
                : card.images.length - 1
              : imageIndex - 1;
        } else {
          // right
          if (isBio) {
            newIndex = imageIndex === card.images.length ? 0 : imageIndex + 1;
          } else {
            newIndex = imageIndex === card.images.length - 1 ? 0 : imageIndex + 1;
          }
        }
        setImageIndex(newIndex);
        ReactNativeHapticFeedback.trigger("impactLight", options);
      }}
    >
      <View style={styles.card}>
        {card && card.images.length > 0 ? (
          imageIndex > card.images.length - 1 ? (
            <View style={styles.cardImage}>
              <FastImage
                resizeMode={FastImage.resizeMode.cover}
                source={{ uri: card.images[0].path }}
                style={styles.cardImage}
              />
              <View style={styles.overlayView} />
            </View>
          ) : (
            <FastImage
              resizeMode={FastImage.resizeMode.cover}
              source={{ uri: card.images[imageIndex].path }}
              style={styles.cardImage}
            />
          )
        ) : (
          <View style={styles.cardImage} />
        )}
      </View>
      <View style={styles.topActions}>
        <LinearGradient
          colors={GRADIENT.FADE_UP}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={styles.gradientOpacityBack}
        />
        <SafeAreaView pointerEvents={"box-none"}>
          <CardProgressBar
            count={isBio ? card.images.length + 1 : card.images.length}
            activeIndex={imageIndex}
            onPress={index => {
              setImageIndex(index);
            }}
          />
          <Header
            item={card}
            showBio={card && imageIndex > card.images.length - 1}
            onReport={props.onReport}
          />
        </SafeAreaView>
      </View>
    </Touchable>
  );
};

export default Card;

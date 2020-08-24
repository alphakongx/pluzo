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

  FastImage.preload(card.images.map(item => ({ uri: item.path })));

  const changeShowDetail = () => {
    props.changeShowDetail && props.changeShowDetail();
  };

  return (
    <View style={styles.container}>
      <Touchable
        style={styles.card}
        activeOpacity={1}
        onPress={e => {
          let newIndex = 0;
          if (e.nativeEvent.locationX < screenWidth / 2) {
            // left
            newIndex = imageIndex === 0 ? card.images.length - 1 : imageIndex - 1;
          } else {
            // right
            newIndex = imageIndex === card.images.length - 1 ? 0 : imageIndex + 1;
          }
          setImageIndex(newIndex);
          ReactNativeHapticFeedback.trigger("impactLight", options);
        }}
      >
        {card && card.images.length > 0 ? (
          <FastImage
            resizeMode={FastImage.resizeMode.cover}
            source={{ uri: card.images[imageIndex].path }}
            style={styles.cardImage}
          />
        ) : (
          <View style={styles.cardImage} />
        )}
      </Touchable>
      <LinearGradient
        colors={GRADIENT.FADE_UP}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.topActions}
      >
        <SafeAreaView>
          <CardProgressBar
            count={card.images.length}
            activeIndex={imageIndex}
            onPress={index => {
              setImageIndex(index);
            }}
          />
          {!props.visibleDetail && (
            <Header item={card} onInfoClicked={changeShowDetail} />
          )}
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

export default Card;

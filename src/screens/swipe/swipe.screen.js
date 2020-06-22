import React from "react-native";
import { TextInput, View } from "react-native";
// import { Image } from "@components";
import Story from "react-native-story";
import LinearGradient from "react-native-linear-gradient";
import Header from "./header";
import { GRADIENT } from "@config";

import stories from "./stories.data";

import styles from "./swipe.style";
const images = ["https://placeimg.com/640/640/any", "https://placeimg.com/640/640/any"];

const Swipe: () => React$Node = props => {
  return (
    <LinearGradient
      colors={GRADIENT.SCREEN_BACKGROUND}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <Header />
      <View style={styles.contentContainer}>
        <Story
          unPressedBorderColor='#e95950'
          pressedBorderColor='#ebebeb'
          stories={stories}
          footerComponent={
            <TextInput placeholder='Send message' placeholderTextColor='white' />
          }
        />
      </View>
    </LinearGradient>
  );
};

export default Swipe;

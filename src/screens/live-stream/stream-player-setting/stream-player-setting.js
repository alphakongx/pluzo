import React, { useState } from "react";
import { View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT } from "@config";
import { Touchable, Image, Text } from "@components";
import Images from "@assets/Images";

import styles from "./stream-player-setting.style";
import { SafeAreaView } from "react-navigation";

const StreamPlayerSetting: () => React$Node = props => {

  const renderItem = (icon, text, mark = false) => {
    return (
      <View style={styles.button}>
        <View style={styles.buttonCircle}>
          <Image source={icon} />
        </View>
        <Text style={styles.buttonText}>
          {text}
        </Text>
        {
          mark && 
          <LinearGradient
            colors={GRADIENT.BUTTON}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.markCircle}
          />
        }
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Touchable style={styles.backButton}
        onPress={() => {
          props.onHidePlayerSetting && props.onHidePlayerSetting();
        }}>
        <Image source={Images.app.icBack} style={styles.backImage} />
      </Touchable>
      <LinearGradient
        colors={GRADIENT.SCREEN_BACKGROUND}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.contentContainer}
      >
        <SafeAreaView style={styles.buttonContainer}>
          <Touchable>
            {renderItem(Images.app.icReverse, `Reverse\ncamera`)}
          </Touchable>
          <Touchable>
            {renderItem(Images.app.icLive, `Disable\ncamera`)}
          </Touchable>
          <Touchable>
            {renderItem(Images.app.icMic, `Mute\nmicrophone`)}
          </Touchable>
          <Touchable>
            {renderItem(Images.app.icShare, `Share\nscreen`)}
          </Touchable>
          <Touchable>
            {renderItem(Images.app.icFilter, `Filters`, true)}
          </Touchable>
        </SafeAreaView>
      </LinearGradient>
      
    </View>
  );
};

export default StreamPlayerSetting;

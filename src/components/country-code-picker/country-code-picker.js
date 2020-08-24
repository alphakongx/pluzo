import React, { useState, useEffect } from "react";
import { View, ScrollView, Animated } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Touchable } from "../touchable";
import { Image } from "../image";
import Images from "@assets/Images";

import styles from "./country-code-picker.style";

const countries = require("./countries.json");

const CountryCodePicker: () => React$Node = props => {
  const [showPicker, setShowPicker] = useState(false);
  const [country, setCountry] = useState(props.country);
  const [visibility] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(visibility, {
      toValue: showPicker ? 1 : 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [showPicker, visibility]);

  useEffect(() => {
    props.onChange && props.onChange(country);
  }, [country, props]);

  return (
    <View style={styles.container}>
      <Touchable
        style={[styles.currentItem, props.style]}
        onPress={() => {
          setShowPicker(!showPicker);
        }}
      >
        <Image
          source={Images.flags[country === undefined ? "us" : country.iso2]}
          style={styles.flag}
        />
      </Touchable>
      {showPicker && (
        <Animated.View
          style={[
            styles.contentContainer,
            {
              opacity: visibility.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
              transform: [
                {
                  scale: visibility.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.spacer} />
          <ScrollView>
            {countries.map(item => {
              return (
                <Touchable
                  key={item.name}
                  style={styles.itemContainer}
                  onPress={() => {
                    setCountry(item);
                    setShowPicker(false);
                  }}
                >
                  <Image source={Images.flags[item.iso2]} style={styles.flag} />
                </Touchable>
              );
            })}
          </ScrollView>
          <LinearGradient
            colors={["rgba(171, 167, 213, 1)", "rgba(171, 167, 213, 0)"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={styles.bottomFade}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default CountryCodePicker;

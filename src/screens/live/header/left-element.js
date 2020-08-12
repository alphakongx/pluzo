import React, { useState, useEffect } from "react";
import { View, Animated, Easing, Platform } from "react-native";
import { Text, SearchInput } from "@components";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT } from "@config";

import styles from "./left-element.style";

const LeftElement: () => React$Node = props => {
  const [textInput, setTextInput] = useState(props.isSearchActive);
  const [opacityValue, setOpacityValue] = useState(new Animated.Value(1));

  useEffect(() => {
    animateElements(props.isSearchActive);
  }, [props.isSearchActive]);

  const animateElements = (nextIsSearchActive) => {
    Animated.timing(opacityValue, {
        toValue: 0,
        duration: 112,
        easing: Easing.linear,
        useNativeDriver: Platform.OS === 'android',
    }).start(() => {
      setTextInput(nextIsSearchActive);
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 112,
        easing: Easing.linear,
        useNativeDriver: Platform.OS === 'android',
      }).start();
    });
  }

  return (
    <Animated.View style={[styles.container, { opacity: opacityValue }]}>
      {
        textInput ? (
          <View style={styles.searchContainer}>
            <SearchInput
              autoFocus
              onSearch={() => {}}
              onRef={(ref) => {}}
              containerStyle={styles.searchInput}
            />
          </View>
        ) : (
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>{"Live"}</Text>
            <View style={styles.onlineIconContainer}>
              <LinearGradient
              colors={GRADIENT.FRIEND_ONLINE_ICON}
              from={{ x: 0, y: 0 }}
              to={{ x: 1, y: 0 }}
              style={styles.onlineIcon}
            />
            </View>
          </View>
        )
      }
    </Animated.View>
  );
};

export default LeftElement;

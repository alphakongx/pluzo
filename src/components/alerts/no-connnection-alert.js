import React, { useState, useEffect, useRef } from "react";
import { Animated, SafeAreaView } from "react-native";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT } from "@config";
import { BoxShadow } from "../shadow";
import { Text } from "../text";
import { AnimatedDots } from "../animated-dots";

import styles, { width } from "./no-connnection-alert.style";

const NoConnectionAlert: () => React$Node = props => {
  const [height, setHeight] = useState(1);
  const hideTimeout = useRef(null);
  const [animValue] = useState(new Animated.Value(1));
  var translateY = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-150, 0],
  });
  const shadowOption = {
    width: width - 10,
    height: height,
    color: "#0B0416",
    opacity: 0.5,
    _borderRadius: 11,
    spread: 0,
    blur: 10,
    offsetX: 0,
    offsetY: 6,
  };

  useEffect(() => {
    clearTimeout(hideTimeout.current);
    animValue.setValue(0);
    Animated.timing(animValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
    return () => {
      clearTimeout(hideTimeout.current);
    }
  }, []);

  return (
    <SafeAreaView>
      <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
        <BoxShadow setting={shadowOption} />
        <LinearGradient
          colors={GRADIENT.SCREEN_BACKGROUND}
          style={styles.contentContainer}
          onLayout={e => {
            setHeight(e.nativeEvent.layout.height);
          }}
        >
          <FastImage
            source={require("@assets/images/no-connection.png")}
            style={[styles.noConnectionIcon]}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={styles.contentText}>
            {"No connection. We are trying to reconnect."}
          </Text>          
          <AnimatedDots style={styles.dots} />

        </LinearGradient>
      </Animated.View>
    </SafeAreaView>
  );
};

export default NoConnectionAlert;

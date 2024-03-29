import React, { useState } from "react";
import { Animated, PanResponder, Pressable } from "react-native";
import { Image } from "@components";

import styles, { width } from "./pluzo-like-swiper.style";

const PluzoLikeSwiper: () => React$Node = props => {
  const [animating, setAnimating] = useState(false);
  const [_scaleAnim] = useState(new Animated.Value(0));
  const [_hideAnim] = useState(new Animated.Value(1));

  let isMoving = false;
  let _pan = new Animated.ValueXY();
  const _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => {
      setAnimating(false);
      return false;
    },
    onMoveShouldSetPanResponder: (evt, gestureState) => animating,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => animating,
    onPanResponderGrant: (event, gestureState) => {
      isMoving = true;
    },
    onPanResponderMove: (event, gestureState) => {
      Animated.event([null, { dx: _pan.x, dy: _pan.y }], { useNativeDriver: false })(
        event,
        gestureState,
      );
    },
    onPanResponderRelease: (e, gestureState) => {
      isMoving = false;
      onStopAnimating(gestureState);
      // if (Math.abs(gestureState.dx) < 2 && Math.abs(gestureState.dy) < 2) {
      //   props.onPress();
      // }
    },
    onPanResponderEnd: () => {
      isMoving = false;
      onStopAnimating(null);
    },
  });

  const onStartAnimating = () => {
    setAnimating(true);
    Animated.timing(_scaleAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: false,
    }).start();
    props.onDragStart && props.onDragStart();
  };

  const onStopAnimating = gestureState => {
    if (isMoving) return;
    setAnimating(false);

    let swipeDirection = null;
    if (gestureState !== null) {
      if (gestureState.dx < 0 && gestureState.dx < -width / 5) {
        swipeDirection = "left";
      } else if (gestureState.dx > 0 && gestureState.dx > width / 5) {
        swipeDirection = "right";
      }
    }
    _pan.flattenOffset();
    _pan.setValue({ x: 0, y: 0 });
    Animated.timing(_scaleAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start(() => {
      if (swipeDirection !== null) {
        Animated.timing(_hideAnim, {
          toValue: 0,
          duration: 350,
          useNativeDriver: false,
        }).start(() => {
          props.onSwipedDirection && props.onSwipedDirection(swipeDirection);
        });
      }
    });

    props.onDragEnd && props.onDragEnd();
  };

  return (
    <Animated.View
      style={[
        styles.container,
        props.style,
        animating ? styles.zIndexHigh : styles.zIndexZero,
        {
          opacity: _hideAnim,
          transform: [
            {
              scale: _scaleAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.05],
              }),
            },
            { translateX: _pan.x },
            { translateY: _pan.y },
            {
              rotate: _pan.x.interpolate({
                inputRange: [-width / 4, 0, width / 4],
                outputRange: ["10deg", "0deg", "-10deg"],
              }),
            },
            { perspective: 1000 },
          ],
        },
      ]}
      {..._panResponder.panHandlers}
    >
      <Pressable
        onPress={props.onPress}
        onPressIn={() => onStartAnimating()}
        onPressOut={() => onStopAnimating(null)}
      >
        {props.children}
      </Pressable>

      <Animated.View
        pointerEvents={"none"}
        style={[
          styles.overlayContainer,
          {
            opacity: _pan.x.interpolate({
              inputRange: [-width / 5, 0],
              outputRange: [1, 0],
            }),
          },
        ]}
      >
        <Image source={require("@assets/images/swipe-screen/swipe-cross.png")} />
      </Animated.View>

      <Animated.View
        pointerEvents={"none"}
        style={[
          styles.overlayContainer,
          {
            opacity: _pan.x.interpolate({
              inputRange: [0, width / 5],
              outputRange: [0, 1],
            }),
          },
        ]}
      >
        <Image source={require("@assets/images/swipe-screen/swipe-heart.png")} />
      </Animated.View>
    </Animated.View>
  );
};

export default PluzoLikeSwiper;

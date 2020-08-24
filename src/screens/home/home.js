import React, { useEffect, useState } from "react";
import { View, Animated, PanResponder } from "react-native";
import { HomeStack } from "../../navigation/home-navigator";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import EventBus from "eventing-bus";
import { BoxShadow } from "@components";
import { StreamStatus } from "@constants";
import { Notification } from "@helpers";
import LiveStream from "../live-stream";

import styles, { width, height } from "./home.style";
const shadowOptions = {
  width: 130,
  height: 200,
  color: "#0B0516",
  opacity: 1,
  _borderRadius: 22,
  spread: 0,
  blur: 10,
  offsetX: 0,
  offsetY: 6,
};

const Home = props => {
  const insets = useSafeAreaInsets();
  const { setStreamStatus } = props;
  const [visibleStream, setVisibleStream] = useState(false);
  const [streamParams, setStreamParams] = useState(null);
  const [minimized, setMinimized] = useState(false);
  const [position, setPosition] = useState(3);
  const [originalPos, setOriginalPos] = useState({ x: 0, y: 0 });

  const maxDeltaY = height - (insets.bottom + insets.top + 100);
  const positionStyle = [
    { left: 10, top: insets.top + 60 },
    { right: 10, top: insets.top + 60 },
    { left: 10, bottom: insets.bottom + 60 },
    { right: 10, bottom: insets.bottom + 60 },
  ];

  var _panXY = new Animated.ValueXY();
  var _scaleX = new Animated.Value(0);
  var _scaleY = new Animated.Value(0);
  var _opacity = new Animated.Value(1);
  const scaleXInterpolate = _scaleX.interpolate({
    inputRange: [0, width],
    outputRange: [1, 130 / width],
    extrapolate: "clamp",
  });
  const scaleYInterpolate = _scaleY.interpolate({
    inputRange: [0, height],
    outputRange: [1, 200 / height],
    extrapolate: "clamp",
  });

  const isLeaveArea = gestureState => {
    const { dx, dy } = gestureState;
    let centerY = originalPos.y + 100 + dy;
    let centerX = originalPos.x + 65 + dx;

    if (centerY < insets.top + 50 || centerY > height - insets.bottom - 50) {
      return true;
    }
    if (centerX < 65 || centerX > width - 65) {
      return true;
    }
    return false;
  };

  const _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gestureState) => {
      if (minimized) return true;
      if (props.isScrolling) return false;
      return (
        props.streamStatus !== StreamStatus.STARTING &&
        e.nativeEvent.pageY < height / 2 - 50
      );
    },
    onPanResponderMove: (e, gestureState) => {
      if (minimized) {
        Animated.event(
          [
            null,
            {
              dx: _panXY.x,
              dy: _panXY.y,
            },
          ],
          { useNativeDriver: false },
        )(e, gestureState);
        if (isLeaveArea(gestureState)) {
          Animated.timing(_opacity, {
            toValue: 0.5,
            duration: 50,
            useNativeDriver: false,
          }).start();
        } else {
          Animated.timing(_opacity, {
            toValue: 1,
            duration: 50,
            useNativeDriver: false,
          }).start();
        }
      } else {
        if (gestureState.dy > 0) {
          Animated.timing(_panXY, {
            toValue: { x: 0, y: gestureState.dy / 3 },
            duration: 100,
            useNativeDriver: false,
          }).start();
        }
      }
    },
    onPanResponderRelease: (e, gestureState) => {
      if (!minimized) {
        if (gestureState.vy > 1 || gestureState.dy > maxDeltaY - 30) {
          minimizedView();
        } else {
          Animated.parallel([
            Animated.timing(_panXY, {
              toValue: { x: 0, y: 0 },
              duration: 100,
              useNativeDriver: false,
            }),
          ]).start();
        }
      } else {
        if (Math.abs(gestureState.dx) < 5 && Math.abs(gestureState.dy) < 5) {
          setMinimized(false);
        } else {
          if (isLeaveArea(gestureState)) {
            Notification.confirmAlert(
              "Stop broadcasting?",
              "Are you sure you want to leave the room?",
              "LEAVE",
              () => {
                setVisibleStream(false);
              },
              () => {
                Animated.timing(_opacity, {
                  toValue: 1,
                  duration: 50,
                  useNativeDriver: false,
                }).start(() => {
                  updateViewPosition(gestureState);
                });
              },
            );
          } else {
            updateViewPosition(gestureState);
          }
        }
      }
    },
  });

  const minimizedView = () => {
    let animPos =
      originalPos.x === 0
        ? {
            x: width - 140 - width / 2 + 65,
            y: height - 260 - insets.bottom - height / 2 + 100,
          }
        : { x: originalPos.x - width / 2 + 65, y: originalPos.y - height / 2 + 100 };
    Animated.parallel([
      Animated.timing(_scaleX, {
        toValue: width,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(_scaleY, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(_panXY, {
        toValue: animPos,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setMinimized(true);
    });
  };

  const updateViewPosition = gestureState => {
    const { dx, dy } = gestureState;
    let centerX = originalPos.x + dx + 65;
    let centerY = originalPos.y + dy + 100;
    let newPosition = 0;
    if (centerX >= width / 2) {
      if (centerY >= height / 2) {
        newPosition = 3;
      } else {
        newPosition = 1;
      }
    } else {
      if (centerY >= height / 2) {
        newPosition = 2;
      } else {
        newPosition = 0;
      }
    }
    Animated.timing(_panXY, {
      toValue: { x: 0, y: 0 },
      duration: 10,
      useNativeDriver: false,
    }).start(() => {
      if (position !== newPosition) {
        setPosition(newPosition);
      }
    });
  };

  useEffect(() => {
    const newStreamAction = EventBus.on("NEW_STREAM_ACTION", params => {
      setStreamParams(params);
      setMinimized(false);
      console.log(params);
      if (params.isJoin) {
        setStreamStatus(StreamStatus.STARTED);
      } else {
        setStreamStatus(StreamStatus.STARTING);
      }
      setVisibleStream(true);
    });
    return () => {
      newStreamAction();
    };
  }, [setStreamStatus]);

  return (
    <View style={styles.container}>
      <HomeStack navigation={props.navigation} />
      {visibleStream && streamParams ? (
        <Animated.View
          style={[
            styles.absoluteView,
            minimized ? styles.minimizedView : styles.fullView,
            minimized ? positionStyle[position] : {},
            {
              opacity: _opacity,
              transform: [
                { translateX: _panXY.x },
                { translateY: _panXY.y },
                { scaleX: scaleXInterpolate },
                { scaleY: scaleYInterpolate },
              ],
            },
          ]}
          {..._panResponder.panHandlers}
          onLayout={e => {
            if (minimized) {
              setOriginalPos({ x: e.nativeEvent.layout.x, y: e.nativeEvent.layout.y });
            }
          }}
        >
          {minimized && <BoxShadow setting={shadowOptions} />}
          <View style={[styles.floatingContainer, minimized ? styles.border : {}]}>
            <LiveStream
              navigation={props.navigation}
              streamParams={streamParams}
              minimized={minimized}
              onMinimized={minimizedView}
              onLeaveRoom={() => {
                setVisibleStream(false);
              }}
            />
          </View>
        </Animated.View>
      ) : null}
    </View>
  );
};

Home.router = HomeStack.router;

export default Home;

import React from "react";
import { View, Dimensions, PanResponder, Animated } from "react-native";
import { SafeAreaView } from "react-navigation";
import { TransitionPresets } from "react-navigation-stack";
import { BlurView } from "@react-native-community/blur";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT } from "@config";
import { CardProgressBar, Touchable, BoxShadow } from "@components";

import Header from "./header";
import ProfileDetail from "./profile-detail";
import ReportModal from "../report-modal";

import styles from "./profile-view.style";

const screenWidth = Dimensions.get("window").width;

class ProfileView extends React.Component {
  static navigationOptions = {
    ...TransitionPresets.ModalSlideFromBottomIOS,
  };

  constructor(props) {
    super(props);
    this.state = {
      imageIndex: 0,
      imageWidth: 1,
      imageHeight: 1,
      visibleReport: false,
    };

    this._panResponder = null;
    this.pan = new Animated.ValueXY();
    this.backdropOpacity = new Animated.Value(1);
    this.headerOpacity = new Animated.Value(1);
    this.initPanGesture();

    const { user } = this.props.navigation.state.params;
    FastImage.preload(user.images.map(image => ({ uri: image.path })));
  }

  initPanGesture() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) => {
        return !(Math.abs(gestureState.dx) < 5 && Math.abs(gestureState.dy) < 5);
      },
      onPanResponderMove: this._onPanResponderMove.bind(this),
      onPanResponderRelease: this._onPanResponderRelease.bind(this),
    });
  }

  _onPanResponderMove(event, gestureState) {
    if (gestureState.dy > 0) {
      const newOpacityFactor = 1 - gestureState.dy / this.state.imageHeight;
      let zeroHeight = 30;
      const newHeaderFactor =
        gestureState.dy > zeroHeight ? 0 : 1 - gestureState.dy / zeroHeight;
      Animated.parallel([
        Animated.timing(this.backdropOpacity, {
          toValue: newOpacityFactor,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.timing(this.headerOpacity, {
          toValue: newHeaderFactor,
          duration: 50,
          useNativeDriver: false,
        }),
      ]).start();
      Animated.event([null, { dy: this.pan.y }], { useNativeDriver: false })(
        event,
        gestureState,
      );
    }
  }

  _onPanResponderRelease(event, gestureState) {
    if (gestureState.vy > 1 || gestureState.dy >= this.state.imageHeight / 2) {
      Animated.parallel([
        Animated.timing(this.backdropOpacity, {
          toValue: 0,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.timing(this.headerOpacity, {
          toValue: 0,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.timing(this.pan, {
          toValue: { x: 0, y: this.state.imageHeight },
          duration: 100,
          useNativeDriver: false,
        }),
      ]).start(() => {
        this.props.navigation.goBack();
      });
    } else {
      Animated.parallel([
        Animated.timing(this.backdropOpacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.timing(this.headerOpacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.timing(this.pan, {
          toValue: { x: 0, y: 0 },
          duration: 100,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }

  onImagePressed = e => {
    let index = this.state.imageIndex;
    const { user } = this.props.navigation.state.params;
    let images = user.images || [];
    if (e.nativeEvent.pageX < screenWidth / 2) {
      index -= 1;
      if (index < 0) index = images.length - 1;
    } else {
      index += 1;
      if (index >= images.length) index = 0;
    }
    this.setState({ imageIndex: index });
  };

  render() {
    const { user } = this.props.navigation.state.params;
    const { imageIndex, imageWidth, imageHeight, visibleReport } = this.state;
    let images = user.images || [];
    let [translateY] = [this.pan.y];

    let shadowOption = {
      width: imageWidth,
      height: imageHeight,
      color: "#0B0516",
      opacity: 1,
      _borderRadius: 22,
      spread: 0,
      blur: 20,
      offsetX: 0,
      offsetY: 6,
    };

    return (
      <View style={styles.container}>
        <Animated.View
          ref={ref => (this.backdropRef = ref)}
          style={[styles.flexFill, { opacity: this.backdropOpacity }]}
        >
          <BlurView style={styles.container} blurType='dark' blurAmount={10} />
        </Animated.View>
        <Animated.View style={{ opacity: this.headerOpacity }}>
          <Header
            user={user}
            onBack={() => {
              this.props.navigation.goBack();
            }}
            onReport={() => this.setState({ visibleReport: true })}
          />
        </Animated.View>
        <SafeAreaView style={styles.container}>
          <Animated.View
            style={[styles.gestureContainer, { transform: [{ translateY }] }]}
            {...this._panResponder.panHandlers}
          >
            <BoxShadow setting={shadowOption} />
            <Touchable style={styles.touchArea} onPress={e => this.onImagePressed(e)}>
              <View
                style={styles.contentContainer}
                onLayout={e => {
                  const { layout } = e.nativeEvent;
                  this.setState({ imageWidth: layout.width, imageHeight: layout.height });
                }}
              >
                <FastImage
                  source={{ uri: images[imageIndex].path }}
                  style={styles.profileImage}
                />

                <LinearGradient
                  colors={GRADIENT.FADE_UP}
                  start={{ x: 1, y: 1 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.detailContainer}
                >
                  <CardProgressBar
                    count={images.length}
                    activeIndex={imageIndex}
                    onPress={index => {
                      this.setState({ imageIndex: index });
                    }}
                  />
                  <ProfileDetail user={user} />
                </LinearGradient>
              </View>
            </Touchable>
          </Animated.View>
        </SafeAreaView>

        <ReportModal
          isVisible={visibleReport}
          keyboardDisable={true}
          onDismiss={() => this.setState({ visibleReport: false })}
        />
      </View>
    );
  }
}

export default ProfileView;

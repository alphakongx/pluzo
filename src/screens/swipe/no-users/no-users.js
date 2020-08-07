import React from "react";
import { View, Animated, Easing } from "react-native";
import { SafeAreaView } from "react-navigation";
import LinearGradient from "react-native-linear-gradient";
import { Image, Text, GradientButton } from "@components";
import { BlurView } from "@react-native-community/blur";
import Modal from "react-native-modal";

import styles from "./no-users.style";
import DiscoverySettings from "./discovery-settings/discovery-settings";

class NoUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleSetting: false,
    };
    this.progress = new Animated.Value(0);
    this.animatedA = new Animated.Value(0);
    this.animatedB = new Animated.Value(0);
    this.animatedC = new Animated.Value(0);

    var inputRange = [0, 1];
    var outputRange = ["0deg", "360deg"];
    this.rotateA = this.animatedA.interpolate({ inputRange, outputRange });
    this.rotateB = this.animatedB.interpolate({ inputRange, outputRange });
    this.rotateC = this.animatedC.interpolate({ inputRange, outputRange });
  }

  componentDidMount() {
    Animated.loop(
      Animated.timing(this.animatedA, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: false,
        easing: Easing.linear,
      }),
    ).start();
    Animated.loop(
      Animated.timing(this.animatedB, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: false,
        easing: Easing.linear,
      }),
    ).start();
    Animated.loop(
      Animated.timing(this.animatedC, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false,
        easing: Easing.linear,
      }),
    ).start();
    Animated.loop(
      Animated.timing(this.progress, {
        toValue: 1,
        easing: Easing.out(Easing.ease),
        duration: 2000,
        useNativeDriver: true,
      }),
    ).start();
  }

  render() {
    const transformA = [{ rotate: this.rotateA }];
    const transformB = [{ rotate: this.rotateB }];
    const transformC = [{ rotate: this.rotateC }];

    let rippleStyle = {
      transform: [
        {
          scale: this.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        },
      ],
      opacity: this.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.04],
      }),
    };

    return (
      <SafeAreaView style={styles.rootContainer}>
        <View style={styles.animationContainer}>
          <View style={styles.container}>
            <Animated.View style={[styles.containerC, rippleStyle]} />
            <Animated.View style={[styles.containerB, rippleStyle]} />
            <Animated.View style={[styles.containerA, rippleStyle]} />
            {this.props.user !== null && this.props.user.image !== null && (
              <Image source={{ uri: this.props.user.image }} style={styles.userImage} />
            )}

            <View style={styles.circleA}>
              <Animated.View style={[styles.circleItemA, { transform: transformA }]}>
                <LinearGradient
                  colors={["#02FFF3", "#617FFF"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.dotA}
                />
              </Animated.View>
            </View>

            <View style={styles.circleB}>
              <Animated.View style={[styles.circleItemB, { transform: transformB }]}>
                <LinearGradient
                  colors={["#02FFF3", "#617FFF"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.dotB}
                />
              </Animated.View>
            </View>

            <View style={styles.circleC}>
              <Animated.View style={[styles.circleItemC, { transform: transformC }]}>
                <LinearGradient
                  colors={["#02FFF3", "#617FFF"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.dotC}
                />
              </Animated.View>
            </View>
          </View>
        </View>

        <Text style={styles.descriptionText}>
          There's noone around you. Expand your discovery settings to see more people.
        </Text>
        <View style={styles.buttonContainer}>
          <GradientButton
            style={styles.settingButton}
            text={"Discovery Settings"}
            onPress={() => {
              this.setState({ visibleSetting: true });
            }}
          />
        </View>

        <Modal
          isVisible={this.state.visibleSetting}
          customBackdrop={
            <BlurView
              style={styles.flexFill}
              blurType='dark'
              blurAmount={10}
              reducedTransparencyFallbackColor='#0B0516'
            />
          }
          animationIn={"zoomIn"}
          animationOut={"zoomOut"}
          backdropTransitionOutTiming={0}
          backdropOpacity={1}
          useNativeDriver={false}
          propagateSwipe={true}
        >
          <DiscoverySettings
            onBack={() => {
              this.setState({ visibleSetting: false });
            }}
          />
        </Modal>
      </SafeAreaView>
    );
  }
}

export default NoUsers;

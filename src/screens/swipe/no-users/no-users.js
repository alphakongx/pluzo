import React from "react";
import { View, Animated, Easing, SafeAreaView, Linking } from "react-native";
import FastImage from "react-native-fast-image";
import { Text, GradientButton, Touchable } from "@components";
import { BlurView } from "@react-native-community/blur";
import Modal from "react-native-modal";

import styles from "./no-users.style";
import SwipeSettings from "../../settings/swipe-settings";

class NoUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleSetting: false,
      visibleGenderSetting: false,
      disableButton: true,
    };
    this.progress = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.loop(
      Animated.timing(this.progress, {
        toValue: 1,
        easing: Easing.out(Easing.ease),
        duration: 2000,
        useNativeDriver: true,
      }),
    ).start();

    setTimeout(() => {
      this.setState({disableButton: false});
    }, 1000);
  }

  render() {
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
    const { user, permission } = this.props;

    return (
      <View style={styles.rootContainer}>
        <View style={styles.animationContainer}>
          <View style={styles.container}>
            <Animated.View style={[styles.containerC, rippleStyle]} />
            <Animated.View style={[styles.containerB, rippleStyle]} />
            <Animated.View style={[styles.containerA, rippleStyle]} />
            {!permission && user !== null && user.images !== null && user.images.length > 0 && (
              <FastImage
                source={{ uri: this.props.user.images[0].path }}
                style={styles.userImage}
              />
            )}
            {permission && 
            <>
              <Text style={styles.permissionTitle}>Oops!</Text>
              <Text style={styles.permissionDescription}>
                {"In order to use Pluzo you\nneed to enable your location."}
              </Text>
            </>}
          </View>
        </View>

        <View style={styles.contentContainer}>
          <SafeAreaView>
            <Text style={styles.descriptionText}>
              {permission ? 
              "Go to Settings > Pluzo > Location >\nEnable Location while using the app" :
              "There's no one around you. Expand your discovery settings to see more people."}
            </Text>
            <View style={styles.buttonContainer}>
              <GradientButton
                style={styles.settingButton}
                text={permission ? "Show Settings" : "Discovery Settings"}
                disabled={this.props.isLoadingCards}
                onPress={() => {
                  if (permission) {
                    Linking.openSettings();
                  } else {
                    this.setState({ visibleSetting: true });
                  }
                }}
              />
            </View>
          </SafeAreaView>
        </View>

        <Modal
          isVisible={this.state.visibleSetting}
          customBackdrop={
            <Touchable
              style={styles.flexFill}
              onPress={() => this.setState({ visibleSetting: false })}
            >
              <BlurView
                style={styles.flexFill}
                blurType='dark'
                blurAmount={10}
                reducedTransparencyFallbackColor='#0B0516'
              />
            </Touchable>
          }
          animationIn={"zoomIn"}
          animationOut={"zoomOut"}
          backdropTransitionOutTiming={0}
          backdropOpacity={1}
          useNativeDriver={false}
          propagateSwipe={true}
          swipeDirection={"down"}
          onSwipeComplete={() => this.setState({ visibleSetting: false })}
        >
          <SwipeSettings
            onBack={() => {
              this.setState({ visibleSetting: false });
            }}
            isModal={true}
            navigation={this.props.navigation}
          />
        </Modal>
      </View>
    );
  }
}

export default NoUsers;

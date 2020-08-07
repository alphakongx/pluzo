import React from "react";
import { View, ImageBackground, Dimensions } from "react-native";
import { SafeAreaView } from "react-navigation";
import { TransitionPresets } from "react-navigation-stack";
import { BlurView } from "@react-native-community/blur";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT } from "@config";
import { CardProgressBar, Touchable } from "@components";
import Images from "@assets/Images";
import Header from "./header";
import styles from "./profile-view.style";
import ProfileDetail from "./profile-detail";

const screenWidth = Dimensions.get("window").width;

class ProfileView extends React.Component {
  static navigationOptions = {
    ...TransitionPresets.ModalSlideFromBottomIOS,
  };

  constructor(props) {
    super(props);
    this.state = {
      imageIndex: 0,
    };
  }

  render() {
    const { user } = this.props.navigation.state.params;
    const { imageIndex } = this.state;
    let allImages = [];
    let images = user.images || [];
    images.forEach(image => {
      allImages.push(image.path);
    });

    return (
      <View style={styles.container}>
        <BlurView style={styles.flexFill} blurType='dark' blurAmount={10} />
        <Header
          user={user}
          onBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <SafeAreaView style={styles.container}>
          <Touchable
            style={styles.touchArea}
            onPress={e => {
              let index = imageIndex;
              if (e.nativeEvent.pageX < screenWidth / 2) {
                index -= 1;
                if (index < 0) index = allImages.length - 1;
              } else {
                index += 1;
                if (index >= allImages.length) index = 0;
              }
              this.setState({ imageIndex: index });
            }}
          >
            <ImageBackground
              style={styles.contentContainer}
              source={
                typeof allImages[imageIndex] === "string"
                  ? { uri: allImages[imageIndex] }
                  : allImages[imageIndex]
              }
            >
              <LinearGradient
                colors={GRADIENT.FADE_UP}
                start={{ x: 1, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={styles.detailContainer}
              >
                <CardProgressBar
                  count={allImages.length}
                  activeIndex={imageIndex}
                  onPress={index => {
                    this.setState({ imageIndex: index });
                  }}
                />
                <ProfileDetail user={user} />
              </LinearGradient>
            </ImageBackground>
          </Touchable>
        </SafeAreaView>
      </View>
    );
  }
}

export default ProfileView;

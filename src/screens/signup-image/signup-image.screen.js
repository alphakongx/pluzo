import React, { useState } from "react";
import { Image, View } from "react-native";
import {
  GradientButton,
  ProgressBar,
  Screen,
  SolidButton,
  Text,
  Touchable,
} from "@components";
import styles from "./signup-image.style.js";
import ImagePicker from "react-native-image-picker";

const SignupImage: () => React$Node = props => {
  const [userImage, setUserImage] = useState(null);
  const onPressUpload = () => {
    const options = {
      title: "Select Avatar",
      customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        setUserImage(response);
      }
    });
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  return (
    <Screen>
      <View style={styles.container}>
        <ProgressBar />
        <Touchable onPress={goBack}>
          <View style={styles.backButtonContainer}>
            <Image source={require("@assets/images/chevron-left.png")} />
          </View>
        </Touchable>
        <View style={styles.contentContainer}>
          <Text style={styles.titleText}>Show us who you are!</Text>
          <Text style={styles.subTitleText}>Upload a profile picture.</Text>

          <View style={styles.imageUploadContainer}>
            {userImage ? (
              <Image style={styles.imageContainer} source={{ uri: userImage.uri }} />
            ) : (
              <View style={styles.imageContainer}>
                <Image source={require("@assets/images/image.png")} />
              </View>
            )}

            <View style={styles.imageSeparator} />

            <SolidButton text={"Upload"} onPress={onPressUpload} />
          </View>
        </View>

        <View style={styles.footer}>
          <GradientButton
            onPress={() => {
              props.navigation.navigate("SIGNUP_PHONE_NUMBER", {});
            }}
            title={"Continue"}
          />
        </View>
      </View>
    </Screen>
  );
};

export default SignupImage;

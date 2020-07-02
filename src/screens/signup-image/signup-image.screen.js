import React from "react";
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
        let photoUriSplit = response.uri.split("/");

        const image = {
          uri: response.uri,
          name: photoUriSplit[photoUriSplit.length - 1],
          type: response.type,
        };
        console.log(response);

        props.setPicture(image);
      }
    });
  };

  const goBack = () => {
    props.navigation.goBack();
  };
  const navigateNext = () => {
    props.navigation.navigate("SIGNUP_PHONE_NUMBER", {});
  };

  return (
    <Screen>
      <View style={styles.container}>
        <ProgressBar width={50} />
        <Touchable onPress={goBack}>
          <View style={styles.backButtonContainer}>
            <Image source={require("@assets/images/chevron-left.png")} />
          </View>
        </Touchable>
        <View style={styles.contentContainer}>
          <Text style={styles.titleText}>Show us who you are!</Text>
          <Text style={styles.subTitleText}>Upload a profile picture.</Text>

          <View style={styles.imageUploadContainer}>
            {props.picture ? (
              <Image style={styles.imageContainer} source={{ uri: props.picture.uri }} />
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
            disabled={!props.picture}
            onPress={navigateNext}
            text={"Continue"}
          />
        </View>
      </View>
    </Screen>
  );
};

export default SignupImage;

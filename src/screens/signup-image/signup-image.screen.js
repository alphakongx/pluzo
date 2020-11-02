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
import ImagePicker from "react-native-image-crop-picker";
import ActionSheet from "react-native-actionsheet";

const SignupImage: () => React$Node = props => {
  let actionSheetRef = React.createRef();

  const onPressUpload = () => {
    actionSheetRef.show();
  };

  const onSelectImage = index => {
    const options = {
      width: 600,
      height: 800,
      cropping: true,
      compressImageQuality: 0.7,
    };

    if (index === 0) {
      ImagePicker.openCamera(options).then(image => {
        onUploadImage(image);
      });
    } else if (index === 1) {
      ImagePicker.openPicker(options).then(image => {
        onUploadImage(image);
      });
    }
  };

  const onUploadImage = data => {
    let photoUriSplit = data.path.split("/");

    const image = {
      uri: data.path,
      name: photoUriSplit[photoUriSplit.length - 1],
      type: data.mime,
    };
    props.setPicture(image);
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
        <ProgressBar width={80} />
        <Touchable onPress={goBack}>
          <View style={styles.backButtonContainer}>
            <Image source={require("@assets/images/chevron-left.png")} />
          </View>
        </Touchable>
        <View style={styles.contentContainer}>
          <Text style={styles.titleText}>Show us who you are!</Text>
          <Text style={styles.subTitleText}>Upload a profile picture.</Text>

          <View style={styles.imageUploadContainer}>
            <Touchable style={styles.imageContainer} onPress={onPressUpload}>
              {props.picture ? (
                <Image
                  source={{ uri: props.picture.uri }}
                  style={styles.imageContainer}
                />
              ) : (
                <Image source={require("@assets/images/image.png")} />
              )}
            </Touchable>

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

        <ActionSheet
          ref={o => (actionSheetRef = o)}
          title={"Select Image"}
          options={["Take Photo...", "Choose from Library...", "Cancel"]}
          cancelButtonIndex={2}
          onPress={index => onSelectImage(index)}
        />
      </View>
    </Screen>
  );
};

export default SignupImage;

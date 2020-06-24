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
import styles from "./signup-gender-select.style.js";

const SignupGenderSelect: () => React$Node = props => {
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
          <Text style={styles.titleText}>What is your gender?</Text>

          <View style={styles.selectionContainer}>
            <View style={styles.buttonContainer}>
              <SolidButton text={"Male"} />
            </View>

            <View style={styles.buttonSeparator} />

            <View style={styles.buttonContainer}>
              <SolidButton text={"Female"} />
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <GradientButton
            onPress={() => {
              props.navigation.navigate("SIGNUP_USERNAME", {});
            }}
            text={"Continue"}
          />
        </View>
      </View>
    </Screen>
  );
};

export default SignupGenderSelect;

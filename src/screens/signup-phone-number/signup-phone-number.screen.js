import React from "react";
import { Image, View } from "react-native";
import {
  GradientButton,
  ProgressBar,
  Screen,
  Text,
  TextInput,
  Touchable,
} from "@components";
import styles from "./signup-phone-number.style.js";

const SignupPhoneNumber: () => React$Node = props => {
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
          <Text style={styles.titleText}>What is your phone number?</Text>

          <View style={styles.phoneContainer}>
            <View style={styles.phoneCodeContainer}>
              <Text style={styles.phoneLabel}>PHONE CODE</Text>
              <TextInput placeholder={"+1"} />
            </View>
            <View style={styles.phoneSeparator} />
            <View style={styles.phoneNumberContainer}>
              <TextInput placeholder={"Your phone number"} />
            </View>
          </View>

          <View style={styles.informationContainer}>
            <View style={styles.instructionContainer}>
              <Text style={styles.instructionText}>
                We need your phone number solely for the login. Your number won't be
                visible for others.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <GradientButton
            onPress={() => {
              props.navigation.navigate("SIGNUP_CODE_VERIFICATION", {});
            }}
            text={"Create Account"}
          />
        </View>
      </View>
    </Screen>
  );
};

export default SignupPhoneNumber;

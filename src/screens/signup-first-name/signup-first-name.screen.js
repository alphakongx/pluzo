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
import styles from "./signup-first-name.style.js";

const SignupFirstName: () => React$Node = props => {
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
          <View style={styles.titleFieldContainer}>
            <Text style={styles.titleText}>What's your first name?</Text>

            <TextInput placeholder={"First name"} />
          </View>

          <View style={styles.buttonContainer}>
            <GradientButton
              onPress={() => {
                props.navigation.navigate("SIGNUP_GENDER_SELECT", {});
              }}
              title={"Continue"}
            />
          </View>
        </View>
      </View>
    </Screen>
  );
};

export default SignupFirstName;

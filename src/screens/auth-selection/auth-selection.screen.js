import React from "react";
import { View } from "react-native";
import { Image, SolidButton, GradientButton, Screen, Text } from "@components";
import styles from "./auth-selection.style.js";

const AuthSelection: () => React$Node = props => {
  const navigateToLogin = () => {
    props.navigation.navigate("LOGIN", {});
  };

  const navigateToSignup = () => {
    props.navigation.navigate("SIGNUP_FIRST_NAME", {});
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require("@assets/images/logo.png")} />
          <Text style={styles.titleText}>Make new friends</Text>
        </View>

        <View style={styles.bottomContentContainer}>
          <View style={styles.buttonContainer}>
            <GradientButton onPress={navigateToLogin} text={"Login"} />
          </View>
          <View style={styles.buttonContainer}>
            <SolidButton onPress={navigateToSignup} text={"Register"} />
          </View>

          <View style={styles.termPolicyContainer}>
            <Text style={styles.termPolicyText}>
              With your registration you agree to our
            </Text>
            <Text style={styles.termPolicyText}>
              <Text style={styles.underline}>Terms of Use</Text> and{" "}
              <Text style={styles.underline}>Data Policy.</Text>
            </Text>
          </View>
        </View>
      </View>
    </Screen>
  );
};

export default AuthSelection;

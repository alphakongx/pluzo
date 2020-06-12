import React from "react";
import { View } from "react-native";
import {
  BorderButton,
  GradientButton,
  Screen,
  Text,
  TextInput,
  Touchable,
} from "@components";
import styles from "./login.style.js";

const LoginScreen: () => React$Node = props => {
  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.titleText}>Login</Text>

        <TextInput placeholder={"Username"} />

        <View style={styles.inputFieldSeparator} />

        <TextInput placeholder={"Password"} secureTextEntry />

        <View style={styles.buttonContainer}>
          <GradientButton title={"Login"} />
        </View>

        <Text style={styles.orText}>OR</Text>

        <BorderButton text={"Login with phone number"} />

        <Touchable style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>
            Forgot Password
          </Text>
        </Touchable>
      </View>
    </Screen>
  );
};

export default LoginScreen;

import React from "react";
import { View } from "react-native";
import {
  BorderButton,
  GradientButton,
  Image,
  Screen,
  Text,
  TextInput,
  Touchable,
} from "@components";
import styles from "./login.style.js";

const LoginScreen: () => React$Node = props => {
  const goBack = () => {
    props.navigation.goBack();
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Touchable onPress={goBack}>
          <View style={styles.backButtonContainer}>
            <Image source={require("@assets/images/chevron-left.png")} />
          </View>
        </Touchable>
        <View style={styles.centeredContentContainer}>
          <Text style={styles.titleText}>Login</Text>

          <TextInput placeholder={"Username"} />

          <View style={styles.inputFieldSeparator} />

          <TextInput placeholder={"Password"} secureTextEntry />

          <View style={styles.buttonContainer}>
            <GradientButton text={"Login"} />
          </View>

          <Text style={styles.orText}>OR</Text>

          <BorderButton text={"Login with phone number"} />

          <Touchable
            onPress={() => {
              props.navigation.navigate("FORGOT_PASSWORD", {});
            }}
            style={styles.forgotPasswordContainer}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password</Text>
          </Touchable>
        </View>
      </View>
    </Screen>
  );
};

export default LoginScreen;

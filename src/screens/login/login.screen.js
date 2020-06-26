import React from "react";
import { View } from "react-native";
import {
  BackButton,
  BorderButton,
  GradientButton,
  Screen,
  Text,
  TextInput,
  Touchable,
} from "@components";
import LoginForm from "./login.form";
import styles from "./login.style.js";

const LoginScreen: () => React$Node = props => {
  const goBack = () => {
    props.navigation.goBack();
  };
  const { t } = props;

  return (
    <Screen>
      <View style={styles.container}>
        <BackButton onPress={goBack} />
        <View style={styles.centeredContentContainer}>
          <Text style={styles.titleText}>Login</Text>
          <LoginForm />
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

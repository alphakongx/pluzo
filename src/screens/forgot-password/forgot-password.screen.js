import React, { useState } from "react";
import { View } from "react-native";
import {
  BackButton,
  GradientButton,
  ProgressBar,
  Screen,
  Text,
  TextInput,
} from "@components";
import styles from "./forgot-password.style.js";

const SignupPhoneNumber: () => React$Node = props => {
  const [phoneCode, setPhoneCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("123456789");

  const goBack = () => {
    props.navigation.goBack();
  };

  const sendCode = () => {
    props.requestForgotPasswordSendCode(phoneCode + " " + phoneNumber, true);
  };

  return (
    <Screen>
      <View style={styles.container}>
        <ProgressBar />
        <BackButton onPress={goBack} />
        <View style={styles.contentContainer}>
          <Text style={styles.titleText}>Forgot Password?</Text>

          <View style={styles.phoneContainer}>
            <View style={styles.phoneCodeContainer}>
              <Text style={styles.phoneLabel}>PHONE CODE</Text>
              <TextInput
                value={phoneCode}
                onChangeText={setPhoneCode}
                placeholder={"Code"}
              />
            </View>
            <View style={styles.phoneSeparator} />
            <View style={styles.phoneNumberContainer}>
              <TextInput
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder={"Your phone number"}
              />
            </View>
          </View>

          <View style={styles.informationContainer}>
            <View style={styles.instructionContainer}>
              <Text style={styles.instructionText}>
                We will send you a code to your phone number. Enter the code on the next
                page to set a new password
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <GradientButton
            loading={props.isSendingCode}
            disabled={!phoneNumber || !phoneCode}
            onPress={sendCode}
            text={"Send code"}
          />
        </View>
      </View>
    </Screen>
  );
};

export default SignupPhoneNumber;

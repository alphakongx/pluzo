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
import styles from "./login-phone-number.style.js";

const LoginPhoneNumber: () => React$Node = props => {
  const [phoneCode, setPhoneCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("123456789");

  const goBack = () => {
    props.navigation.goBack();
  };

  const sendCode = () => {
    props.requestPhoneLoginSendCode(phoneCode + " " + phoneNumber, true);
  };

  return (
    <Screen>
      <View style={styles.container}>
        <ProgressBar />
        <BackButton onPress={goBack} />
        <View style={styles.contentContainer}>
          <Text style={styles.titleText}>Login with phone number</Text>

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
                page to login
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

export default LoginPhoneNumber;

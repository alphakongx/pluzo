import React, { useState } from "react";
import { View } from "react-native";
import {
  BackButton,
  GradientButton,
  ProgressBar,
  Screen,
  Text,
  TextInput,
  CountryCodePicker,
} from "@components";
import { SCREENS } from "@constants";
import styles from "./login-phone-number.style.js";

const LoginPhoneNumber: () => React$Node = props => {
  const [phoneCode, setPhoneCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const goBack = () => {
    props.navigation.goBack();
  };

  const sendCode = () => {
    props.requestCheckPhone(
      `+${phoneCode} ${phoneNumber}`,
      SCREENS.LOGIN_PHONE_CODE_VERIFICATION,
    );
  };

  return (
    <Screen>
      <View style={styles.container}>
        <ProgressBar width={50} />
        <BackButton onPress={goBack} />
        <View style={styles.contentContainer}>
          <View style={styles.informationContainer}>
            <View style={styles.instructionContainer}>
              <Text style={styles.instructionText}>
                We will send you a code to your phone number. Enter the code on the next
                page to login
              </Text>
            </View>
          </View>

          <View style={styles.phoneContainer}>
            <View style={styles.phoneCodeContainer}>
              <Text style={styles.phoneLabel}>PHONE CODE</Text>
              <CountryCodePicker
                country={{ iso2: "us", dialCode: "1" }}
                onChange={country => {
                  setPhoneCode(country.dialCode);
                }}
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

          <Text style={styles.titleText}>Login with phone number</Text>
        </View>

        <View style={styles.footer}>
          <GradientButton
            loading={props.isCheckingPhone}
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

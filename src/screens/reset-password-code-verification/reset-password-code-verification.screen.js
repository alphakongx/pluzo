import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { BackButton, GradientButton, Screen, Text } from "@components";
import CodeInput from "react-native-confirmation-code-input";
import styles from "./reset-password-code-verification.style.js";
import { Countdown } from "react-native-countdown-text";
import moment from "moment";

const ResetPasswordCodeVerification: () => React$Node = props => {
  const [code, setCode] = useState("");
  const [countdownTime, setCountdownTime] = useState(moment().add("seconds", 15).unix());
  const [canResend, setCanResend] = useState(true);
  const phoneNumber = props.navigation.state.params.phoneNumber;

  const goBack = () => {
    props.navigation.goBack();
  };
  const resendCode = () => {
    props.requestForgotPasswordSendCode(phoneNumber, false);
  };
  const submit = () => {
    props.requestForgotPasswordConfirmCode(phoneNumber, code);
  };

  useEffect(() => {
    console.log(props.isSendingCode);
    if (!props.isSendingCode) {
      setCanResend(false);
      setCountdownTime(moment().add("seconds", 15).unix());
    }
  }, [props.isSendingCode]);

  return (
    <Screen>
      <View style={styles.container}>
        <BackButton onPress={goBack} />
        <View style={styles.contentContainer}>
          <Text style={styles.titleText}>Check your messages.</Text>
          <Text style={styles.subTitleText}>
            We've sent you a verification code to ensure you are you.
          </Text>

          <View style={styles.codeContainer}>
            <CodeInput
              className={"border-b"}
              codeLength={4}
              space={10}
              size={68}
              inputPosition='center'
              onFulfill={c => setCode(c)}
              activeColor={"#9892A3"}
              cellBorderWidth={0}
              codeInputStyle={styles.codeInputStyle}
            />
          </View>

          <View style={styles.informationContainer}>
            <View style={styles.instructionContainer}>
              <Text style={styles.instructionText}>Didn't receive it?</Text>
            </View>

            <View style={styles.resendButtonContainer}>
              <GradientButton
                disabled={!canResend}
                loading={props.isSendingCode}
                onPress={resendCode}
                text={"Resend"}
              />
            </View>

            {!canResend ? (
              <View style={styles.instructionContainer}>
                <Countdown
                  format={"ss"}
                  textStyle={styles.instructionText}
                  finishTime={countdownTime}
                  onFinish={() => setCanResend(true)}
                />
              </View>
            ) : null}
          </View>
        </View>

        <View style={styles.footer}>
          <GradientButton
            loading={props.verificationInProgress}
            onPress={submit}
            text={"Change password"}
          />
        </View>
      </View>
    </Screen>
  );
};

export default ResetPasswordCodeVerification;

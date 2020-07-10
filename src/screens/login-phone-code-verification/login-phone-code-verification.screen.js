import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { BackButton, GradientButton, Screen, Text } from "@components";
import CodeInput from "react-native-confirmation-code-input";
import { Countdown } from "react-native-countdown-text";
import moment from "moment";

import styles from "./login-phone-code-verification.style.js";

const LoginPhoneCodeVerification: () => React$Node = props => {
  const [code, setCode] = useState("");
  const [countdownTime, setCountdownTime] = useState(moment().add(15, "seconds").unix());
  const [canResend, setCanResend] = useState(true);
  const phoneNumber = props.navigation.state.params.phoneNumber;

  const goBack = () => {
    props.navigation.goBack();
  };
  const resendCode = () => {
    props.requestPhoneLoginSendCode(phoneNumber, false);
  };
  const submit = () => {
    props.requestPhoneLoginConfirmCode(phoneNumber, code);
  };

  useEffect(() => {
    console.log(props.isSendingCode);
    if (!props.isSendingCode) {
      setCanResend(false);
      setCountdownTime(moment().add(15, "seconds").unix());
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
            text={"Confirm account"}
          />
        </View>
      </View>
    </Screen>
  );
};

export default LoginPhoneCodeVerification;

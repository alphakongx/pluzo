import React from "react";
import { View, Platform, Keyboard, Alert } from "react-native";
import { BackButton, GradientButton, Screen, Text } from "@components";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import Clipboard from '@react-native-community/clipboard';
import RNOtpVerify from "react-native-otp-verify";
import { Countdown } from "react-native-countdown-text";
import moment from "moment";

import styles from "./login-phone-code-verification.style.js";

class LoginPhoneCodeVerification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      countdownTime: moment().add(15, "seconds").unix(),
      canResend: true,
      phoneNumber: this.props.navigation.state.params.phoneNumber,
    }
  }

  componentDidMount() {
    if (Platform.OS === "android") {
      RNOtpVerify.getHash().then(console.log).catch(console.log);
      RNOtpVerify.getOtp()
        .then(p => {
          RNOtpVerify.addListener(this.otpHandler)
        })
        .catch(p => console.log(p));
    }
    this.resendCode();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isSendingCode !== this.props.isSendingCode) {
      if (!this.props.isSendingCode) {
        this.setState({
          canResend: false,
          countdownTime: moment().add(60, "seconds").unix(),
        })
      }
    }
  }

  componentWillUnmount() {
    if (Platform.OS === "android") {
      RNOtpVerify.removeListener();
    }
  }

  otpHandler = (message) => {
    const otp = /(\d{4})/.exec(message);
    console.log("SMS::", otp);
    if (otp !== null) {
      Clipboard.setString(otp[1]);
      RNOtpVerify.removeListener();
      Keyboard.dismiss();
    }
  }
  
  goBack = () => {
    this.props.navigation.goBack();
  };

  resendCode = () => {
    const { phoneNumber } = this.state;
    this.props.requestPhoneLoginSendCode(phoneNumber, false);
  };
  
  submit = () => {
    const { phoneNumber, code } = this.state;
    this.props.requestPhoneLoginConfirmCode(phoneNumber, code);
  };

  render() {
    const { canResend, countdownTime } = this.state;
    return (
      <Screen>
        <View style={styles.container}>
          <BackButton onPress={this.goBack} />
          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>Have Text Grab from your messages</Text>
            <Text style={styles.subTitleText}>
              We've sent you a verification code to ensure you are you.
            </Text>
  
            <View style={styles.codeContainer}>
              <OTPInputView
                codeInputFieldStyle={styles.codeInputStyle}
                style={styles.codeContentContainer}
                pinCount={4}
                autoFocusOnLoad={true}
                onCodeFilled={c => this.setState({code: c})}
              />
            </View>
  
            <View style={styles.informationContainer}>
              <View style={styles.instructionContainer}>
                <Text style={styles.instructionText}>Didn't receive it?</Text>
              </View>
  
              <View style={styles.resendButtonContainer}>
                <GradientButton
                  disabled={!canResend}
                  loading={this.props.isSendingCode}
                  onPress={this.resendCode}
                  text={"Resend"}
                />
              </View>
  
              {!canResend ? (
                <View style={styles.instructionContainer}>
                  <Countdown
                    format={"ss"}
                    textStyle={styles.instructionText}
                    finishTime={countdownTime}
                    onFinish={() => this.setState({canResend: true})}
                  />
                </View>
              ) : null}
            </View>
          </View>
  
          <View style={styles.footer}>
            <GradientButton
              loading={this.props.verificationInProgress}
              onPress={this.submit}
              text={"Confirm account"}
            />
          </View>
        </View>
      </Screen>
    );
  }
};

export default LoginPhoneCodeVerification;

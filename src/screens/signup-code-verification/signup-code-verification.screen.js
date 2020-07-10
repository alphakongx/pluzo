import React, { Component } from "react";
import { View } from "react-native";
import { BackButton, GradientButton, ProgressBar, Screen, Text } from "@components";
import CodeInput from "react-native-confirmation-code-input";
import { Countdown } from "react-native-countdown-text";
import moment from "moment";
import EventBus from "eventing-bus";
import { UserTypes } from "@redux/actions";

import styles from "./signup-code-verification.style.js";

class SignupCodeVerification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: "",
      canResend: false,
      countdownTime: moment().add(15, "seconds").unix(),
    };
  }

  componentDidMount() {
    this.codeActionSubscription = EventBus.on(
      UserTypes.PHONE_VERIFICATION_SEND_CODE_SUCCESS,
      this.startCountDown,
    );
    this.props.requestPhoneVerificationSendCode();
  }

  componentWillUnmount() {
    this.codeActionSubscription();
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  resendCode = () => {
    this.props.requestPhoneVerificationSendCode();
  };

  startCountDown = () => {
    this.setState({
      countdownTime: moment().add(15, "seconds").unix(),
      canResend: false,
    });
  };

  submit = () => {
    const { code } = this.state;

    this.props.requestPhoneVerificationConfirmCode(code, true);
  };

  render() {
    const { code, countdownTime, canResend } = this.state;
    const { verificationInProgress, isSendingPhoneVerificationCode } = this.props;

    return (
      <Screen>
        <View style={styles.container}>
          <ProgressBar width={90} />
          <BackButton onPress={this.goBack} />
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
                onFulfill={c => this.setState({ code: c })}
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
                  loading={isSendingPhoneVerificationCode}
                  disabled={!canResend}
                  text={"Resend"}
                  onPress={this.resendCode}
                />
              </View>

              {!canResend ? (
                <View style={styles.instructionContainer}>
                  <Countdown
                    format={"ss"}
                    textStyle={styles.instructionText}
                    finishTime={countdownTime}
                    onFinish={() => this.setState({ canResend: true })}
                  />
                </View>
              ) : null}
            </View>
          </View>

          <View style={styles.footer}>
            <GradientButton
              loading={verificationInProgress}
              disabled={!code || code.length < 4}
              onPress={this.submit}
              text={"Confirm account"}
            />
          </View>
        </View>
      </Screen>
    );
  }
}

export default SignupCodeVerification;

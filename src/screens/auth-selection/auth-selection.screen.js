import React from "react";
import { View, Linking } from "react-native";
import { Image, SolidButton, GradientButton, Screen, Text, Touchable } from "@components";
import { SCREENS } from "@constants";
import { SERVER } from "@config";
import styles from "./auth-selection.style.js";

const AuthSelection: () => React$Node = props => {
  const { t } = props;
  const navigateToLogin = () => {
    props.navigation.navigate(SCREENS.LOGIN, {});
  };

  const navigateToSignup = () => {
    props.navigation.navigate(SCREENS.SIGNUP_FIRST_NAME, {});
  };

  const navigateToTerms = () => {
    // props.navigation.navigate(SCREENS.TERMS_OF_SERVICE, {});
    Linking.openURL(SERVER.TOS);
  };

  const navigateToPrivacy = () => {
    // props.navigation.navigate(SCREENS.TERMS_OF_SERVICE, { content: "privacy" });
    Linking.openURL(SERVER.PRIVACY);
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require("@assets/images/logo.png")} />
          <Text style={styles.titleText}>{t("authSelection.logoText")}</Text>
        </View>

        <View style={styles.bottomContentContainer}>
          <View style={styles.buttonContainer}>
            <GradientButton onPress={navigateToLogin} text={t("authSelection.login")} />
          </View>
          <View style={styles.buttonContainer}>
            <SolidButton onPress={navigateToSignup} text={t("authSelection.register")} />
          </View>

          <View style={styles.termPolicyContainer}>
            <Text style={styles.termPolicyText}>{t("authSelection.termsPolicy")}</Text>
            <View style={styles.termPolicyRowContainer}>
              <Touchable style={styles.termPolicyButton} onPress={navigateToTerms}>
                <Text style={styles.underline}>{t("authSelection.terms")}</Text>
              </Touchable>
              <Text style={styles.termPolicyText}> {t("authSelection.and")} </Text>
              <Touchable onPress={navigateToPrivacy}>
                <Text style={styles.underline}>{t("authSelection.policy")}</Text>
              </Touchable>
            </View>
          </View>
        </View>
      </View>
    </Screen>
  );
};

export default AuthSelection;

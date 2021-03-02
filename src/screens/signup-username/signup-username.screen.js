import React, { useState, useEffect } from "react";
import KeyboardManager from "react-native-keyboard-manager";
import { View, KeyboardAvoidingView, Platform, ActivityIndicator, ScrollView } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import {
  GradientButton,
  ProgressBar,
  Screen,
  Text,
  TextInput,
  Touchable,
  Image,
  KeyboardListener
} from "@components";
import { checkUsername } from "@redux/api";
import { SCREENS } from "@constants";
import Images from "@assets/Images";

import styles from "./signup-username.style.js";
function hasUpperCase(str) {
  return /[A-Z]/.test(str);
}
function hasNumber(str) {
  return /[0-9]/.test(str);
}

const SignupUsername: () => React$Node = props => {
  const [viewPadding, setViewPadding] = useState(true);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [checkingData, setCheckingData] = useState(null);
  const [visiblePassword, setVisiblePassword] = useState(false);

  useEffect(() => {
    return () => {
      props.setUsername("");
      props.setPassword("");
    }
  }, []);

  const goBack = () => {
    props.navigation.goBack();
  };

  const onChangedUsername = (username) => {
    if (username !== "" && /^(?:[A-Za-z\d+]+)$/.test(username) === false) {
      return;
    }
    props.setUsername(username);
    setCheckingData(null);

    clearTimeout(this.checkingTimeout);
    if (username !== "") {
      this.checkingTimeout = setTimeout(() => {
        setCheckingUsername(true);
        const requestParams = new FormData();
        requestParams.append("username", username);
        checkUsername(requestParams).then((res) => {
          setCheckingUsername(false);
          setCheckingData(res.data.data);
        }).catch(e => {
          setCheckingUsername(false);
          setCheckingData(null);
        });
      }, 1000);
    }
  }

  const navigateNext = () => {
    if (Platform.OS === "ios") {
      KeyboardManager.setShouldResignOnTouchOutside(true);
      KeyboardManager.resignFirstResponder();
    }
    props.navigation.navigate(SCREENS.SIGNUP_IMAGE, {});
  };

  const renderRecommendViews = () => {
    return (
      <ScrollView horizontal
        keyboardShouldPersistTaps={"always"}
        showsHorizontalScrollIndicator={false}
        style={styles.availableScroll}>
        <View style={styles.availableContainer}>
          <Touchable style={styles.availableButton}
            onPress={() => onChangedUsername(checkingData.available_usernames.username1)}>
            <Text style={styles.avaliableText}>{checkingData.available_usernames.username1}</Text>
          </Touchable>
          <View style={styles.availableSeparator} />
          <Touchable style={styles.availableButton}
            onPress={() => onChangedUsername(checkingData.available_usernames.username1)}>
            <Text style={styles.avaliableText}>{checkingData.available_usernames.username2}</Text>
          </Touchable>
          <View style={styles.availableSeparator} />
          <Touchable style={styles.availableButton}
            onPress={() => onChangedUsername(checkingData.available_usernames.username1)}>
            <Text style={styles.avaliableText}>{checkingData.available_usernames.username3}</Text>
          </Touchable>
        </View>
      </ScrollView>
    )
  }

  return (
    <Screen>
      <View style={styles.container}>

        <ProgressBar width={72} />
        <Touchable onPress={goBack}  style={styles.backButtonContainer}>
          <Image source={require("@assets/images/chevron-left.png")} />
        </Touchable>

        <KeyboardAvoidingView 
          style={[styles.contentContainer, viewPadding ? styles.contentPadding : {}]}
          behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <Text
            style={[styles.titleText, checkingData && checkingData.username === 0 && {marginBottom: wp(20)}]}
            numberOfLines={2}
            adjustsFontSizeToFit
          >
            Select your username and choose a password.
          </Text>

          <View style={styles.verticalCenter}>
            <TextInput
              autoCapitalize={"none"}
              onChangeText={text => onChangedUsername(text)}
              value={props.username}
              placeholder={"Username"}
            />
            {checkingUsername === true ? (
              <ActivityIndicator color={"#0B0516"} size={"small"} style={styles.takenPosition} />
            ):(
              (props.username !== "" && checkingData) ? (
                checkingData.username === 1 ? (
                  <Image source={Images.app.icCheck} style={[styles.takenPosition, styles.takenIcon, styles.checkIcon]} />
                ) : (
                  <Image source={Images.app.icCross} style={[styles.takenPosition, styles.takenIcon, styles.crossIcon]} />
                )
              ) : (
                null
              )
            )}
          </View>

          {checkingData && checkingData.username === 0 && !checkingUsername && props.username !== "" &&
          <Text style={styles.takenUsername}>Username already taken.</Text>}

          {checkingData && checkingData.username === 0 &&
          renderRecommendViews()}

          <View style={[styles.inputFieldSeparator, checkingData && checkingData.username === 0 && {height: 0}]} />

          <View style={styles.verticalCenter}>
            <TextInput
              onChangeText={text => props.setPassword(text)}
              value={props.password}
              placeholder={"Password"}
              secureTextEntry={!visiblePassword}
            />
            <Touchable style={styles.takenPosition}
              onPress={() => setVisiblePassword(!visiblePassword)}>
              <Image source={Images.live.icEye} style={[styles.takenIcon, visiblePassword ? styles.visiblePass : styles.invisiblePass]} />
            </Touchable>
          </View>

          <View style={styles.informationContainer}>
            <Text style={styles.passwordRequirementTitle}>Password requires</Text>

            <View style={styles.instructionContainer}>
              <View
                style={
                  props.password.length >= 8
                    ? styles.instructionValidIcon
                    : styles.instructionInvalidIcon
                }
              />
              <Text style={styles.passwordRequirement}>Have at least 8 characters</Text>
            </View>
            <View style={styles.instructionContainer}>
              <View
                style={
                  hasUpperCase(props.password)
                    ? styles.instructionValidIcon
                    : styles.instructionInvalidIcon
                }
              />
              <Text style={styles.passwordRequirement}>
                Have at least one capital letter
              </Text>
            </View>
            <View style={styles.instructionContainer}>
              <View
                style={
                  hasNumber(props.password)
                    ? styles.instructionValidIcon
                    : styles.instructionInvalidIcon
                }
              />
              <Text style={styles.passwordRequirement}>Have at least one number</Text>
            </View>
          </View>
        
          <View style={styles.buttonSeparator} />

          <View style={[styles.footer, !viewPadding && styles.footer1]}>
            <GradientButton
              disabled={
                !(checkingData && checkingData.username === 1) ||
                !props.username ||
                !props.password ||
                props.password.length < 8 ||
                !hasUpperCase(props.password) ||
                !hasNumber(props.password)
              }
              onPress={navigateNext}
              text={"Continue"}
            />
          </View>
        </KeyboardAvoidingView>

      </View>

      <KeyboardListener 
        onWillShow={() => setViewPadding(false)}
        onWillHide={() => setViewPadding(true)}
        onDidShow={() => Platform.OS === "android" && setViewPadding(false)}
        onDidHide={() => Platform.OS === "android" && setViewPadding(true)}/>
      
    </Screen>
  );
};

export default SignupUsername;

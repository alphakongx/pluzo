import React from "react";
import { Image, View } from "react-native";
import { GradientButton, ProgressBar, Screen, Text, Touchable } from "@components";
import styles from "./signup-birthdate.style.js";
import DateTimePicker from "@react-native-community/datetimepicker";

const SignupFirstName: () => React$Node = props => {
  const goBack = () => {
    props.navigation.goBack();
  };

  return (
    <Screen>
      <View style={styles.container}>
        <ProgressBar />
        <Touchable onPress={goBack}>
          <View style={styles.backButtonContainer}>
            <Image source={require("@assets/images/chevron-left.png")} />
          </View>
        </Touchable>
        <View style={styles.contentContainer}>
          <View style={styles.titleFieldContainer}>
            <Text style={styles.titleText}>When were you born?</Text>

            <DateTimePicker
              testID='dateTimePicker'
              value={new Date(1598051730000)}
              mode={"date"}
              is24Hour={true}
              display='default'
              textColor='white'
            />
          </View>

          <View style={styles.buttonContainer}>
            <GradientButton
              onPress={() => {
                props.navigation.navigate("SIGNUP_GENDER_SELECT", {});
              }}
              text={"Continue"}
            />
          </View>
        </View>
      </View>
    </Screen>
  );
};

export default SignupFirstName;

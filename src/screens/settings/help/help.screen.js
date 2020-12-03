import React from "react";
import { SafeAreaView, View } from "react-native";
import { Screen, Text, Touchable } from "@components";
import { SCREENS } from "@constants";

import Header from "../header";
import styles from "./help.style";

const HelpScreen: () => React$Node = props => {

  const helpButtons = ["I have a question", "I found a bug", "I'd like to report a Safety Concern", "Take me to Safety Center"];

  const onHelp = (index) => {
    props.navigation.navigate(SCREENS.HELP_CONTENT, {type: index});
  }

  return (
    <Screen hasGradient style={styles.flexFill}>
      <SafeAreaView style={styles.flexFill}>
        <View style={styles.flexFill}>
          <Header title={""} onBack={props.navigation.goBack} />

          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>Help</Text>
            {helpButtons.map((button, index) => {
              return (
                <Touchable style={styles.buttonContainer} key={`help-button-${index}`}
                  onPress={() => onHelp(index)}>
                  <Text style={styles.buttonText}>{button}</Text>
                </Touchable>
              )
            })}
          </View>
          
        </View>
      </SafeAreaView>
    </Screen>
  );
};

export default HelpScreen;

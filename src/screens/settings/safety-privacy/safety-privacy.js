import React from "react";
import { SafeAreaView, View } from "react-native";
import { Screen, Text, Image } from "@components";
import Images from "@assets/Images";

import Header from "../header";
import styles from "./safety-privacy.style";

const SafetyPrivacy: () => React$Node = props => {
  const renderItem = (title, text, hint) => {
    return (
      <View style={styles.itemPadding}>
        <View style={styles.flexRow}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.valueText}>{text}</Text>
          <Image source={Images.app.icRight} style={styles.arrowIcon} />
        </View>
        {hint !== null && <Text style={styles.hintText}>{hint}</Text>}
      </View>
    );
  };

  return (
    <Screen hasGradient style={styles.flexFill}>
      <SafeAreaView style={styles.flexFill}>
        <View style={styles.flexFill}>
          <Header title={"Safety & Privacty"} onBack={props.navigation.goBack} />

          {renderItem("Blocked Users", "0", null)}
          <View style={styles.seperator} />
          {renderItem("Location", "", "Manage the access to your location data")}
          <View style={styles.emptyRow} />
          {renderItem("Camera and microphone", "", null)}
          <View style={styles.seperator} />
          {renderItem("Personalization and data", "", null)}
        </View>
      </SafeAreaView>
    </Screen>
  );
};

export default SafetyPrivacy;

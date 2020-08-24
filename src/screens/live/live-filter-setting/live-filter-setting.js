import React from "react";
import { View, SafeAreaView } from "react-native";
import { TransitionPresets } from "react-navigation-stack";
import {
  BlurView,
  BackDownButton,
  Screen,
  Text,
  Image,
  Touchable,
  GradientButton,
} from "@components";
import { SCREENS } from "@constants";
import Images from "@assets/Images";

import styles from "./live-filter-setting.style";

const LiveFilterSetting: () => React$Node = props => {
  const goBack = () => {
    props.navigation.goBack();
  };

  const renderSortTypes = () => {
    const sortTypes = ["Friends", "Participants", "Distance"];
    return sortTypes.map((item, index) => {
      return (
        <Touchable
          key={`sort-by-${index}`}
          style={styles.itemContainer}
          onPress={() => props.setSortBy(item.toLowerCase())}
        >
          <Text style={styles.itemText}>{item}</Text>
          {props.sortBy === item.toLocaleLowerCase() ? (
            <View>
              <GradientButton containerStyle={styles.sortSelection} />
            </View>
          ) : (
            <View style={styles.sortNoSelection} />
          )}
        </Touchable>
      );
    });
  };

  return (
    <View style={styles.container}>
      <BlurView />
      <SafeAreaView style={styles.contentContainer}>
        <BackDownButton onPress={goBack} />
      </SafeAreaView>

      <Screen hasGradient style={styles.filterContainer}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.titleText}>Live-Filter</Text>

          <Text style={styles.subTitleText}>Sort by</Text>
          {renderSortTypes()}

          <View style={styles.seperator} />

          <Text style={styles.subTitleText}>Location</Text>
          <Touchable
            style={styles.itemContainer}
            onPress={() => {
              props.navigation.navigate(SCREENS.COUNTRY_SELECTION);
            }}
          >
            <Text style={styles.itemText}>Country</Text>
            <Text style={styles.countryName}>{props.filterCountry.name}</Text>
            <Image
              source={Images.flags[props.filterCountry.iso2]}
              style={styles.flagIcon}
            />
            <Image source={Images.app.icRight} />
          </Touchable>
        </SafeAreaView>
      </Screen>
    </View>
  );
};

LiveFilterSetting.navigationOptions = {
  ...TransitionPresets.FadeFromBottomAndroid,
};

export default LiveFilterSetting;

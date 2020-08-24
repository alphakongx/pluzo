import React from "react";
import { View, SafeAreaView, FlatList } from "react-native";
import { BackButton, Screen, Text, Image, Touchable, GradientButton } from "@components";
import Images from "@assets/Images";

import styles from "./country-selection.style";

const CountrySelection: () => React$Node = props => {
  const countries = [
    {
      name: "Worldwide",
      iso2: "worldwide",
      dialCode: "",
      priority: 0,
      areaCodes: null,
    },
    ...require("@components/country-code-picker/countries.json"),
  ];

  const goBack = () => {
    props.navigation.goBack();
  };

  const renderCountryItem = country => {
    console.log(country);
    return (
      <Touchable
        style={styles.itemContainer}
        onPress={() => props.setFilterCountry(country)}
      >
        <Image source={Images.flags[country.iso2]} style={styles.flagIcon} />
        <Text style={styles.itemText}>{country.name}</Text>
        {country.name === props.filterCountry.name ? (
          <View>
            <GradientButton containerStyle={styles.sortSelection} />
          </View>
        ) : (
          <View style={styles.sortNoSelection} />
        )}
      </Touchable>
    );
  };

  return (
    <Screen hasGradient style={styles.container}>
      <SafeAreaView style={styles.container}>
        <BackButton onPress={goBack} />
        <Text style={styles.titleText}>Location</Text>

        <FlatList
          data={countries}
          keyExtractor={(item, index) => item.name}
          ItemSeparatorComponent={() => <View style={styles.seperator} />}
          renderItem={({ item: item, index }) => {
            return renderCountryItem(item);
          }}
        />
      </SafeAreaView>
    </Screen>
  );
};

export default CountrySelection;

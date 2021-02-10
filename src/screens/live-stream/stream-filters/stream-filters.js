import React, { useState } from "react";
import { 
  FlatList,
  View,
  SafeAreaView
} from "react-native";
import {
  BoxShadow,
  Touchable,
  Image
} from "@components";
import Images from "@assets/Images";
import LinearGradient from "react-native-linear-gradient";

import styles, { wp } from "./stream-filters.style";

const StreamFilters: () => React$Node = props => {
  const colors = [
    ["transparent", "transparent"],
    ["#617FFF", "#02FFF3"],
    ["#617FFF", "#FF0202"],
    ["#D4FF61", "#02FFF3"],
    ["#D4FF61", "#FF0202"],
  ];
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.flexFill}>

        <View>
          <FlatList
            data={[0, 1, 2, 3, 4]}
            horizontal
            style={styles.filterList}
            contentContainerStyle={styles.listContent}
            keyExtractor={(item) => `filters-${item}`}
            renderItem={({item: item, index}) => {
              let isSelected = item === props.maskMode;
              return (
                <Touchable onPress={() => props.setMaskMode(item)}>
                  <BoxShadow setting={{
                    width: isSelected ? wp(70) : wp(48),
                    height: isSelected ? wp(70) : wp(48),
                    color: "#fff",
                    opacity: 0.3,
                    _borderRadius: isSelected ? wp(35) : wp(24),
                    spread: 4,
                    blur: 11,
                    offsetX: 0,
                    offsetY: 0,
                  }} />
                  <View style={isSelected ? styles.bigCircle : styles.circle}>
                    <LinearGradient
                      colors={colors[item]}
                      start={{x: 0, y: 0}}
                      end={{x: 0, y: 1}}
                      style={isSelected ? styles.bigChildCircle : styles.childCircle} />
                  </View>
                </Touchable>
              )
            }}
          />
          <Touchable
            style={styles.buttonContainer}
            onPress={props.onBack}>
            <Image source={Images.app.icBackLeft} />
          </Touchable>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default StreamFilters;

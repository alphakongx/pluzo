import React, { Component } from "react";
import { ActivityIndicator } from "react-native";
import { View } from "react-native";
import { Text } from "../text";
import { Touchable } from "../touchable";
import styles from "./border-button.style";

class GradientButton extends Component {
  render() {
    var { onPress, text, disabled, loading, color, textStyle } = this.props;

    return (
      <Touchable disabled={disabled} onPress={onPress}>
        <View
          style={[styles.container, color === undefined ? {} : { borderColor: color }]}
        >
          {loading ? (
            <ActivityIndicator size={"small"} color={"white"} />
          ) : (
            <Text style={[styles.buttonText, textStyle === undefined ? {} : textStyle]}>
              {text}
            </Text>
          )}
        </View>
      </Touchable>
    );
  }
}

export default GradientButton;

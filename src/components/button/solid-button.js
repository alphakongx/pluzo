import React, { Component } from "react";
import { ActivityIndicator } from "react-native";
import { View } from "react-native";
import { Text, Touchable } from "@components";
import styles from "./solid-button.style";

class WhiteButton extends Component {
  render() {
    var { onPress, text, disabled, loading, containerStyle, textStyle } = this.props;

    return (
      <Touchable disabled={disabled} onPress={onPress}>
        <View style={[styles.container, containerStyle]}>
          {loading ? (
            <ActivityIndicator size={"small"} color={"white"} />
          ) : (
            <Text style={[
              styles.buttonText,
              textStyle,
            ]}>{text}</Text>
          )}
        </View>
      </Touchable>
    );
  }
}

export default WhiteButton;

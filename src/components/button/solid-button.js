import React, { Component } from "react";
import { View } from "react-native";
import { Text, Touchable } from "@components";
import styles from "./solid-button.style";

class WhiteButton extends Component {
  render() {
    var { onPress, text, disabled } = this.props;

    return (
      <Touchable disabled={disabled} onPress={onPress}>
        <View style={styles.container}>
          <Text style={styles.buttonText}>{text}</Text>
        </View>
      </Touchable>
    );
  }
}

export default WhiteButton;

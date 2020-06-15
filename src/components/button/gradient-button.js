import React, { Component } from "react";
import { Text, Touchable } from "@components";
import styles from "./gradient-button.style";
import LinearGradient from "react-native-linear-gradient";

class GradientButton extends Component {
  render() {
    var { onPress, title, disabled } = this.props;

    return (
      <Touchable disabled={disabled} onPress={onPress}>
        <LinearGradient
          colors={["#617FFF", "#02FFF3"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.container}
        >
          <Text style={styles.buttonText}>{title}</Text>
        </LinearGradient>
      </Touchable>
    );
  }
}

export default GradientButton;
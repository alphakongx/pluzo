import React, { Component } from "react";
import { ActivityIndicator } from "react-native";
import { Text, Touchable } from "@components";
import styles from "./gradient-button.style";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT } from "@config";

class GradientButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var { onPress, text, disabled, loading, colors } = this.props;

    return (
      <Touchable disabled={loading || disabled} onPress={onPress}>
        <LinearGradient
          colors={disabled ? GRADIENT.BUTTON_DISABLED : colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.container}
        >
          {loading ? (
            <ActivityIndicator size={"small"} color={"white"} />
          ) : (
            <Text style={disabled ? styles.buttonTextDisabled : styles.buttonText}>
              {text}
            </Text>
          )}
        </LinearGradient>
      </Touchable>
    );
  }
}

GradientButton.defaultProps = {
  colors: GRADIENT.BUTTON,
};

export default GradientButton;

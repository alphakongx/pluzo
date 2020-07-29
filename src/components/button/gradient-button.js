import React, { Component } from "react";
import { ActivityIndicator } from "react-native";
import { Text } from "../text";
import { Touchable } from "../touchable";
import styles from "./gradient-button.style";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT } from "@config";

class GradientButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var {
      onPress,
      text,
      disabled,
      loading,
      colors,
      containerStyle,
      textStyle,
    } = this.props;

    return (
      <Touchable disabled={loading || disabled} onPress={onPress}>
        <LinearGradient
          colors={disabled ? GRADIENT.BUTTON_DISABLED : colors}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={[styles.container, containerStyle]}
        >
          {loading ? (
            <ActivityIndicator size={"small"} color={"white"} />
          ) : (
            <Text
              style={[
                styles.buttonText,
                textStyle,
                disabled ? styles.buttonTextDisabled : {},
              ]}
            >
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

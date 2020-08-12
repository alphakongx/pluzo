import React, { Component } from "react";
import { ActivityIndicator } from "react-native";
import { Text } from "../text";
import { Touchable } from "../touchable";
import { BoxShadow } from "../shadow";
import styles from "./gradient-button.style";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT } from "@config";

class GradientButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 60,
      height: 45,
      radius: 22.5,
    }
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
      shadowColor = "#1900FF"
    } = this.props;
    const {width, height, radius} = this.state;

    return (
      <Touchable disabled={loading || disabled} onPress={onPress}>
        <BoxShadow setting={{
          width: width,
          height: height,
          color: shadowColor,
          opacity: 0.38,
          _borderRadius: radius,
          spread: 0,
          blur: 20,
          offsetX: 0,
          offsetY: 0,
        }}/>
        <LinearGradient
          colors={disabled ? GRADIENT.BUTTON_DISABLED : colors}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={[styles.container, containerStyle]}
          onLayout={(e) => {
            const { layout } = e.nativeEvent;
            this.setState({width: layout.width, height: layout.height, radius: layout.height / 2})
          }}
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

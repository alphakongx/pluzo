import React, { Component } from "react";
import { Image, View } from "react-native";
import { Text } from "@components";
import { Touchable } from "@components";
import styles from "./touchable-input.styles";

class TouchableInput extends Component {
  render() {
    var { disabled, placeholder, required, value } = this.props;
    var requiredComponent = required ? <Text style={styles.required}>{" *"}</Text> : null;
    placeholder = placeholder || "";

    return (
      <Touchable disabled={disabled} onPress={this.props.onPress}>
        <View style={[styles.container, this.props.style, disabled && styles.disabled]}>
          <View style={styles.contentContainer}>
            {value ? (
              <View style={styles.flexContainer}>
                <Text style={[styles.placeholder, styles.placeholderTextColor]}>
                  {this.props.placeholder}
                  {requiredComponent}
                </Text>
                <Text numberOfLines={1} style={[styles.value, this.props.textStyle]}>
                  {value}
                </Text>
              </View>
            ) : (
              <View style={styles.flexContainer}>
                <Text
                  style={[
                    styles.value,
                    styles.placeholderTextColor,
                    this.props.textStyle,
                  ]}
                >
                  {placeholder}
                  {requiredComponent}
                </Text>
              </View>
            )}
            {typeof this.props.icon !== "undefined" ? (
              this.props.icon
            ) : (
              <Image source={require("@assets/images/chevron.png")} />
            )}
          </View>
        </View>
      </Touchable>
    );
  }
}

export default TouchableInput;

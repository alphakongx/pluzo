import React, { useEffect, useState } from "react";
import {
  Animated,
  TextInput as RNTextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./text-input.style.js";

const TextInput: () => React$Node = props => {
  const { onChangeText, placeholder, value } = props;
  const [text, setText] = useState("");
  const [hasText, setHasText] = useState(props.text ? true : false);
  const [isFocused, setIsFocused] = useState(false);
  const [placeholderFontSize] = useState(
    new Animated.Value(value ? 12 : 16),
  );
  const [placeholderPosition] = useState(
    new Animated.Value(value ? 3 : 9),
  );
  let inputFieldRef = null;

  const onFocusChanged = focus => {
    setIsFocused(focus);
  };

  useEffect(() => {
    setHasText(text ? true : false);
  }, [text]);

  useEffect(() => {
    console.log("STATE CHANGED: ", isFocused, hasText);
    Animated.parallel([
      Animated.timing(placeholderFontSize, {
        toValue: isFocused || hasText ? 12 : 16,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(placeholderPosition, {
        toValue: isFocused || hasText ? 3 : 9,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isFocused, hasText, placeholderFontSize, placeholderPosition]);

  useEffect(() => {}, [placeholderFontSize, placeholderPosition]);

  const focus = () => {
    if (inputFieldRef) inputFieldRef.focus();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={focus}
        style={styles.touchableInputContainer}
      >
        <View style={styles.inputFieldContainer}>
          <Animated.View
            style={[
              styles.placeholderContainer,
              { paddingTop: placeholderPosition },
            ]}
          >
            <Animated.Text
              numberOfLines={1}
              style={[
                styles.placeholder,
                { fontSize: placeholderFontSize },
              ]}
            >
              {placeholder}
            </Animated.Text>
          </Animated.View>
          <RNTextInput
            {...props}
            ref={input => {
              inputFieldRef = input;
            }}
            placeholder=''
            underlineColorAndroid='transparent'
            onFocus={() => onFocusChanged(true)}
            onBlur={() => onFocusChanged(false)}
            style={[styles.inputField]}
            onChangeText={t => {
              onChangeText && onChangeText(t);
              setText({ text: t });
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TextInput;

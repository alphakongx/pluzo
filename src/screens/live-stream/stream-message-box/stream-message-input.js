import React, { Component } from "react";
import {
  View,
  TextInput as RNTextInput,
} from "react-native";
import { Touchable, Image } from "@components";
import Images from "@assets/Images";

import styles from "./stream-message-input.style";

class StreamMessageInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <RNTextInput
            style={styles.inputField}
            placeholder={"Enter a message..."}
            placeholderTextColor={"#FFFFFF"}
            numberOfLines={1}
          />
          <Touchable style={styles.sendButton}>
            <Image source={Images.app.icSend} style={styles.sendIcon} />
          </Touchable>
        </View>
        <Touchable onPress={() => {
          this.props.onGameControls &&
          this.props.onGameControls();
        }}>
          <Image source={Images.live.icGame} style={styles.gameIcon} />
        </Touchable>
        <Touchable onPress={() => {
          this.props.onPlayerSetting &&
          this.props.onPlayerSetting();
        }}>
          <Image source={Images.app.icSetting} style={styles.settingIcon} />
        </Touchable>
      </View>
    );
  }
}

export default StreamMessageInput;

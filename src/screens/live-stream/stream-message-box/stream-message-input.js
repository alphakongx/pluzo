import React, { Component } from "react";
import {
  View,
  TextInput as RNTextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Touchable, Image } from "@components";
import Images from "@assets/Images";

import styles from "./stream-message-input.style";

class StreamMessageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      width: Dimensions.get("window").width - 25,
    };
  }

  onSend = () => {
    let msg = this.state.message.trim();
    if (msg === "") {
      console.log("Spaces");
      return;
    }

    this.props.onSend(this.state.message);
    this.setState({ message: "" });
  };

  render() {
    const { isKeyboardShown, isBroadcaster } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.inputContainer}
          contentContainerStyle={styles.flexFill}
          horizontal
          keyboardShouldPersistTaps={"always"}
        >
          <RNTextInput
            value={this.state.message}
            style={styles.inputField}
            placeholder={"Enter a message..."}
            placeholderTextColor={"#FFFFFF"}
            returnKeyType={"send"}
            returnKeyLabel={"Send"}
            blurOnSubmit={false}
            autoCorrect={false}
            numberOfLines={1}
            onChangeText={message => this.setState({ message })}
            onSubmitEditing={() => {
              this.onSend();
            }}
          />
          {this.state.message !== "" && (
            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => {
                this.onSend();
              }}
            >
              <Image source={Images.app.icSend} style={styles.sendIcon} />
            </TouchableOpacity>
          )}
        </ScrollView>
        {!isKeyboardShown && isBroadcaster && (
          <Touchable
            onPress={() => {
              this.props.onGameControls && this.props.onGameControls();
            }}
          >
            <Image source={Images.live.icGame} style={styles.gameIcon} />
          </Touchable>
        )}
        {!isKeyboardShown && isBroadcaster && (
          <Touchable
            onPress={() => {
              this.props.onPlayerSetting && this.props.onPlayerSetting();
            }}
          >
            <Image source={Images.app.icSetting} style={styles.settingIcon} />
          </Touchable>
        )}
        {!isKeyboardShown && !isBroadcaster && (
          <Touchable
            onPress={() => {
              this.props.onAskToJoin && this.props.onAskToJoin();
            }}
            style={styles.handButton}
          >
            <Image source={Images.live.icHand} style={styles.handIcon} />
          </Touchable>
        )}
      </View>
    );
  }
}

export default StreamMessageInput;

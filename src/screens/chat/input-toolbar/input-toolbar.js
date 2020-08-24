import React from "react";
import { Image, Touchable } from "@components";
import { COLOR } from "@config";
import styles from "./input-toolbar.style";
import LinearGradient from "react-native-linear-gradient";
import { InputToolbar as RNInputToolbar, Send, Composer } from "react-native-gifted-chat";

class InputToolbar extends React.Component {
  constructor(props) {
    super(props);
  }
  renderActions = props => {
    return (
      <Touchable onPress={props.onAttachment} style={styles.attachmentsButtonContainer}>
        <LinearGradient
          colors={["#02FFF3", "#617FFF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.attachmentIcon}
        >
          <Image source={require("@assets/images/message-attachment-icon.png")} />
        </LinearGradient>
      </Touchable>
    );
  };

  renderComposer = props => {
    return (
      <Composer
        {...props}
        placeholder={"Enter a message..."}
        placeholderTextColor={COLOR.TEXT_SECONDARY}
        textInputStyle={styles.inputField}
        textInputProps={{
          autoCorrect: false,
        }}
      />
    );
  };

  renderSend = props => {
    return (
      <Send {...props} containerStyle={styles.sendButton}>
        <Image
          source={require("@assets/images/ic-message-send.png")}
          style={styles.sendButtonIcon}
        />
      </Send>
    );
  };

  render() {
    return (
      <RNInputToolbar
        {...this.props}
        containerStyle={styles.container}
        renderActions={this.renderActions}
        renderSend={this.renderSend}
        renderComposer={this.renderComposer}
      />
    );
  }
}

export default InputToolbar;

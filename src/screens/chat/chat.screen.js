import React from "react";
import { Platform, View, Keyboard, ActivityIndicator } from "react-native";
import ImagePicker from "react-native-image-picker";
import { Screen } from "@components";
import { SCREENS } from "@constants";
import { GiftedChat } from "react-native-gifted-chat";
import KeyboardManager from "react-native-keyboard-manager";
import EventBus from "eventing-bus";
import moment from "moment";
import Header from "./header";
import MessageBubble from "./message-bubble";
import Avatar from "./avatar";
import InputToolbar from "./input-toolbar";

import styles from "./chat.style";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatId: null,
      msgText: "",
    };
  }

  componentDidMount() {
    if (Platform.OS === "ios") {
      KeyboardManager.setKeyboardDistanceFromTextField(0);
      KeyboardManager.setEnable(false);
    }

    this.chatIdAction = EventBus.on("NEW_CHAT_ID", chatId => {
      this.setState({ chatId });
    });

    this.newMessageAction = EventBus.on("NEW_MSG", data => {
      const { messages, token, user } = this.props;
      let arrData = JSON.parse(data);
      console.log(typeof arrData[0].chat_id, typeof this.state.chatId);
      // checking chat_id
      if (parseInt(arrData[0].chat_id, 10) !== parseInt(this.state.chatId, 10)) {
        return;
      }

      let newMessages = [];
      newMessages.push({
        _id: arrData[0].id,
        text: arrData[0].text,
        image: arrData[0].image,
        createdAt: moment.unix(arrData[0].created_at).toDate(),
        user: {
          _id: arrData[0].user._id,
          name: arrData[0].user.name,
          avatar: arrData[0].user.images[0],
        },
      });
      this.props.updateMessages(newMessages.concat(messages));
      if (arrData[0].user._id !== user.id) {
        this.props.readMessage([arrData[0].id], token);
      }
    });

    const { token, chatUser, chatId } = this.props;
    this.props.requestMessages(chatId, chatUser.id || chatUser._id, token);
  }

  componentWillUnmount() {
    if (Platform.OS === "ios") {
      KeyboardManager.setKeyboardDistanceFromTextField(65);
      KeyboardManager.setEnable(true);
    }
    this.chatIdAction();
    this.newMessageAction();
  }

  onAddAttachment = () => {
    Keyboard.dismiss();
    const options = {
      title: "Select Image",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        let photoUriSplit = response.uri.split("/");

        const image = {
          uri: response.uri,
          name: photoUriSplit[photoUriSplit.length - 1],
          type: response.type,
        };

        this.props.updateMessages(
          [
            {
              _id: moment().unix(),
              text: this.state.msgText,
              image: response.uri,
              createdAt: new Date(),
              user: {
                _id: this.props.user.id,
                name: this.props.user.name,
                avatar: this.props.user.images[0],
              },
            },
          ].concat(this.props.messages),
        );

        const { chatUser } = this.props;
        const params = {
          chatId: this.state.chatId,
          text: this.state.msgText,
          image: image,
          sendTo: chatUser.id || chatUser._id,
        };
        const { token } = this.props;
        this.props.sendMessage(params, token);
        this.setState({ msgText: "" });
      }
    });
  };

  onSend = (messages = []) => {
    this.props.updateMessages([messages[0]].concat(this.props.messages));

    const { chatUser } = this.props;
    const params = {
      chatId: this.state.chatId,
      text: messages[0].text,
      image: null,
      sendTo: chatUser.id || chatUser._id,
    };
    const { token } = this.props;
    this.props.sendMessage(params, token);
  };

  render() {
    const { chatUser, loading } = this.props;
    return (
      <Screen hasHeader style={styles.container}>
        <Header
          user={chatUser}
          onBack={() => this.props.navigation.goBack()}
          onProfileView={() => {
            this.props.navigation.navigate(SCREENS.PROFILE_VIEW, { user: chatUser });
          }}
        />
        <View style={styles.body}>
          {loading ? (
            <ActivityIndicator
              size={"large"}
              color={"white"}
              style={styles.loadingIndicator}
            />
          ) : (
            <GiftedChat
              messages={this.props.messages}
              text={this.state.msgText}
              isTyping={true}
              isKeyboardInternallyHandled={true}
              renderBubble={bubbleProps => (
                <MessageBubble
                  {...bubbleProps}
                  onLongPress={this._onOpenActionSheet}
                  onPress={this._openAttachment}
                />
              )}
              renderAvatar={avatarProps => {
                return <Avatar {...avatarProps} />;
              }}
              renderInputToolbar={props => {
                return <InputToolbar {...props} onAttachment={this.onAddAttachment} />;
              }}
              renderTime={props => {
                return <View />;
              }}
              user={{
                _id: this.props.user.id,
              }}
              onSend={messages => this.onSend(messages)}
              onInputTextChanged={msgText => this.setState({ msgText })}
            />
          )}
        </View>
      </Screen>
    );
  }
}

export default Chat;

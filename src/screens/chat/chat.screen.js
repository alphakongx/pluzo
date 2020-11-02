import React from "react";
import { Platform, View, Keyboard, ActivityIndicator } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import ActionSheet from "react-native-actionsheet";
import { Screen } from "@components";
import { SCREENS } from "@constants";
import { GiftedChat, SystemMessage } from "react-native-gifted-chat";
import KeyboardManager from "react-native-keyboard-manager";
import EventBus from "eventing-bus";
import moment from "moment";
import Header from "./header";
import MessageBubble from "./message-bubble";
import Avatar from "./avatar";
import InputToolbar from "./input-toolbar";
import ReportModal from "../report-modal";
import { widthPercentageToDP as wp } from "@helpers";
import EmptyView from "./empty-view";

import styles from "./chat.style";
import ZoomImageModal from "./zoom-image-modal";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatId: null,
      msgText: "",
      visibleReport: false,
      visibleZoomImage: false,
      zoomImage: null,
    };
    this.ActionSheet = React.createRef();
  }

  componentDidMount() {
    if (Platform.OS === "ios") {
      KeyboardManager.setKeyboardDistanceFromTextField(0);
      KeyboardManager.setEnable(false);
      KeyboardManager.setShouldResignOnTouchOutside(false);
    }

    this.chatIdAction = EventBus.on("NEW_CHAT_ID", chatId => {
      this.setState({ chatId });
    });

    this.newMessageAction = EventBus.on("NEW_MSG", data => {
      const { messages, token, user } = this.props;
      let arrData = JSON.parse(data);

      // checking chat_id
      if (parseInt(arrData[0].chat_id, 10) !== parseInt(this.state.chatId, 10)) {
        return;
      }
      if (arrData[0].user === 0) {
        arrData[0].user = {
          _id: 0,
          name: "Pluzo Team",
          images: [{ path: require("@assets/images/app-icon.png") }],
        };
      }
      if (parseInt(arrData[0].user._id, 10) === parseInt(user.id, 10)) {
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
          name: arrData[0].user.name || arrData[0].user.username,
          avatar: arrData[0].user.images[0].path,
        },
      });
      this.props.updateMessages(newMessages.concat(messages));
      if (arrData[0].user._id !== user.id) {
        this.props.readMessage([arrData[0].id], token);
      }
    });

    const { token, chatUser, chatId } = this.props;
    if (chatUser === 0) {
      this.props.requestMessages(chatId, chatUser, token);
    } else {
      this.props.requestMessages(chatId, chatUser.id || chatUser._id, token);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === "ios") {
      KeyboardManager.setEnable(true);
      KeyboardManager.setKeyboardDistanceFromTextField(100);
      KeyboardManager.setEnableAutoToolbar(false);
      KeyboardManager.setShouldResignOnTouchOutside(true);
    }
    this.chatIdAction();
    this.newMessageAction();
  }

  onAddAttachment = () => {
    const { messages, chatUser } = this.props;
    let mymsgs = messages.filter(
      value =>
        !value.system &&
        parseInt(value.user._id, 10) === parseInt(this.props.user.id, 10),
    );
    let opponentId = chatUser === 0 ? chatUser : chatUser.id || chatUser._id;
    let otherMsgs = messages.filter(
      value => !value.system && parseInt(value.user._id, 10) === parseInt(opponentId, 10),
    );
    if (mymsgs.length === 0 || otherMsgs.length === 0) {
      this.props.updateMessages(
        [
          {
            _id: moment().millisecond(),
            text: "You can't send photos till you both message each other first",
            createdAt: new Date(),
            system: true,
          },
        ].concat(this.props.messages),
      );
      return;
    }

    Keyboard.dismiss();

    this.ActionSheet.show();
  };

  onSelectImage = index => {
    const options = {
      width: 500,
      height: 395,
      compressImageQuality: 0.7,
      cropping: true,
    };

    if (index === 0) {
      ImagePicker.openCamera(options).then(image => {
        this.onUploadImage(image);
      });
    } else if (index === 1) {
      ImagePicker.openPicker(options).then(image => {
        this.onUploadImage(image);
      });
    }
  };

  onUploadImage = data => {
    let photoUriSplit = data.path.split("/");

    const image = {
      uri: data.path,
      name: photoUriSplit[photoUriSplit.length - 1],
      type: data.mime,
    };

    this.props.updateMessages(
      [
        {
          _id: moment().unix(),
          text: this.state.msgText,
          image: data.path,
          createdAt: new Date(),
          user: {
            _id: this.props.user.id,
            name: this.props.user.name || this.props.user.username,
            avatar: this.props.user.images[0].path,
          },
        },
      ].concat(this.props.messages),
    );

    const { chatUser } = this.props;
    const params = {
      chatId: this.state.chatId,
      text: this.state.msgText,
      image: image,
      sendTo: chatUser === 0 ? chatUser : chatUser.id || chatUser._id,
    };
    const { token } = this.props;
    this.props.sendMessage(params, token);
    this.setState({ msgText: "" });
  };

  onSend = (messages = []) => {
    this.props.updateMessages([messages[0]].concat(this.props.messages));

    const { chatUser } = this.props;
    const params = {
      chatId: this.state.chatId,
      text: messages[0].text,
      image: null,
      sendTo: chatUser === 0 ? chatUser : chatUser.id || chatUser._id,
    };
    const { token } = this.props;
    this.props.sendMessage(params, token);
  };

  render() {
    const { chatUser, loading, messages } = this.props;
    return (
      <Screen hasHeader style={styles.container}>
        <Header
          user={chatUser}
          onBack={() => this.props.navigation.goBack()}
          onProfileView={() => {
            if (chatUser === 0) return;
            this.props.navigation.navigate(SCREENS.PROFILE_VIEW, { user: chatUser });
          }}
          onReport={() => this.setState({ visibleReport: true })}
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
              listViewProps={{ keyboardDismissMode: "on-drag" }}
              messages={messages}
              text={this.state.msgText}
              isKeyboardInternallyHandled={true}
              bottomOffset={this.props.insets.bottom}
              minComposerHeight={wp(20)}
              minInputToolbarHeight={Platform.OS === "ios" ? wp(57) : wp(65)}
              alwaysShowSend={true}
              renderBubble={bubbleProps => (
                <MessageBubble
                  {...bubbleProps}
                  onLongPress={this._onOpenActionSheet}
                  onPress={this._openAttachment}
                  onFullImage={image => {
                    this.setState({ zoomImage: image, visibleZoomImage: true });
                  }}
                />
              )}
              renderAvatar={avatarProps => {
                return <Avatar {...avatarProps} />;
              }}
              renderInputToolbar={props => {
                this.onSendNew = props.onSend;
                return <InputToolbar {...props} onAttachment={this.onAddAttachment} />;
              }}
              renderTime={props => {
                return <View />;
              }}
              renderSystemMessage={props => {
                return <SystemMessage {...props} containerStyle={styles.systemMessage} />;
              }}
              user={{
                _id: this.props.user.id,
              }}
              onSend={msgs => this.onSend(msgs)}
              onInputTextChanged={msgText => {
                if (msgText.lastIndexOf("\n") !== -1) {
                  this.onSendNew({ text: msgText.trim() }, true);
                } else {
                  this.setState({ msgText });
                }
              }}
              renderChatEmpty={() => {
                return <EmptyView user={chatUser} />;
              }}
            />
          )}
        </View>
        <ActionSheet
          ref={o => (this.ActionSheet = o)}
          title={"Select Image"}
          options={["Take Photo...", "Choose from Library...", "Cancel"]}
          cancelButtonIndex={2}
          onPress={index => this.onSelectImage(index)}
        />
        <ReportModal
          isVisible={this.state.visibleReport}
          keyboardDisable={true}
          onDismiss={() => this.setState({ visibleReport: false })}
        />
        <ZoomImageModal
          isVisible={this.state.visibleZoomImage}
          zoomImage={this.state.zoomImage}
          onSwipeComplete={() => this.setState({ visibleZoomImage: false })}
        />
      </Screen>
    );
  }
}

export default Chat;

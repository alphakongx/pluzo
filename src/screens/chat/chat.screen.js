import React from "react";
import {
  Platform,
  View,
  Keyboard,
  ActivityIndicator,
  FlatList,
  Linking,
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import ActionSheet from "react-native-actionsheet";
import {
  Screen,
  Touchable,
  Text,
  Image,
  ConfirmModal,
  NotificationModal,
} from "@components";
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
import { widthPercentageToDP as wp, Notification, API } from "@helpers";
import EmptyView from "./empty-view";
import { API_ENDPOINTS } from "@config";
import LinearGradient from "react-native-linear-gradient";
import ZoomImageModal from "./zoom-image-modal";
import UserSettingModal from "./user-setting-modal";
import Images from "../../assets/Images";

import styles from "./chat.style";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatId: null,
      msgText: "",
      visibleReport: false,
      visibleZoomImage: false,
      visibleUserSetting: false,
      visibleConfirmBlock: false,
      visibleConfirmDelete: false,
      zoomImage: null,
      lastSeenTime: this.props.chatUser === 0 ? null : this.props.chatUser.last_activity,
      isOnline: false,
      openedChat: false,
      sentSystemAlert: false,
      offlineMessages: [],
    };
    this.ActionSheet = React.createRef();
    this._appIsActive = true;
    this._unreadMessages = [];
    this._pushCount = 0;
  }

  componentDidMount() {
    if (Platform.OS === "ios") {
      KeyboardManager.setKeyboardDistanceFromTextField(0);
      KeyboardManager.setEnable(false);
      KeyboardManager.setShouldResignOnTouchOutside(false);
    }
    this.props.updateMessages([]);
    this.checkingOnlineStatus();

    this.chatIdAction = EventBus.on("NEW_CHAT_ID", chatId => {
      this.setState({ chatId });
    });

    this.friendRemoveAction = EventBus.on("Need_Close_Chat", () => {
      this.props.navigation.goBack();
    });

    this.lastSeenAction = EventBus.on("Last_seen", jsonData => {
      let data = JSON.parse(jsonData);
      const { chatUser } = this.props;

      if (chatUser !== 0 && data.user === parseInt(chatUser.id || chatUser._id, 10)) {
        this.setState({ lastSeenTime: parseInt(data.time, 10) });
        this.props.updateMessagesState();
      }
    });

    this.openChatAction = EventBus.on("Open_chat", jsonData => {
      let data = JSON.parse(jsonData);
      const { chatUser } = this.props;

      if (chatUser !== 0 && data.user === parseInt(chatUser.id || chatUser._id, 10)) {
        this.setState({ openedChat: true });
        this.props.requestOpenChat(this.state.chatId, this.props.token);
        this.props.updateMessagesState();
      }
    });

    this.closeChatAction = EventBus.on("Close_chat", jsonData => {
      let data = JSON.parse(jsonData);
      const { chatUser } = this.props;

      if (chatUser !== 0 && data.user === parseInt(chatUser.id || chatUser._id, 10)) {
        this.setState({ openedChat: false });
      }
    });

    this.onlineAction = EventBus.on("User_online", jsonData => {
      let data = JSON.parse(jsonData);
      const { chatUser } = this.props;

      let chatUserId = parseInt(chatUser.id || chatUser._id, 10);
      let onlineUsers = data.user.filter(value => value.id === chatUserId);

      if (chatUser !== 0 && onlineUsers.length > 0) {
        this.setState({ isOnline: true });
      }
    });

    this.offlineAction = EventBus.on("User_offline", jsonData => {
      let data = JSON.parse(jsonData);
      const { chatUser } = this.props;

      let chatUserId = parseInt(chatUser.id || chatUser._id, 10);
      let offlineUsers = data.user.filter(value => value.id === chatUserId);

      if (chatUser !== 0 && offlineUsers.length > 0) {
        this.setState({ isOnline: false, lastSeenTime: offlineUsers[0].last_activity });
      }
    });

    this.newMessageAction = EventBus.on("NEW_MSG", data => {
      const { messages, token, user, chatUser } = this.props;
      let arrData = JSON.parse(data);

      // checking chat_id
      if (this.state.chatId === null) {
        if (arrData[0].user === 0) {
          if (chatUser !== 0) return;
        } else {
          if (
            parseInt(arrData[0].user._id, 10) !==
            parseInt(chatUser.id || chatUser._id, 10)
          ) {
            return;
          }
        }
        this.setState({ chatId: arrData[0].chat_id });
        this.checkingOnlineStatus();
      } else {
        if (parseInt(arrData[0].chat_id, 10) !== parseInt(this.state.chatId, 10)) {
          return;
        }
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
        if (this._appIsActive) {
          this.props.readMessage([arrData[0].id], token);
        } else {
          this._unreadMessages.push(arrData[0].id);
        }
      }
    });

    this.appActiveAction = EventBus.on("AppState_Active", () => {
      this._appIsActive = true;
      if (this._unreadMessages.length > 0 && this.props.token) {
        this.props.readMessage(this._unreadMessages, this.props.token);
        this._unreadMessages = [];
      }
    });
    this.appInActiveAction = EventBus.on("AppState_InActive", () => {
      this._appIsActive = false;
    });

    const { token, chatUser, chatId, allMessages } = this.props;
    let userId = 0;
    if (chatUser === 0) {
      userId = 0;
      this.props.requestMessages(chatId, chatUser, token);
    } else {
      userId = parseInt(chatUser.id || chatUser._id, 10);
      this.props.requestMessages(chatId, chatUser.id || chatUser._id, token);
    }
    this.props.readFlag(chatUser === 0 ? 0 : chatUser.id || chatUser._id, token);

    if (allMessages[`${this.props.user.id}-${userId}`]) {
      this.props.updateMessages(allMessages[`${this.props.user.id}-${userId}`]);
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
    this.lastSeenAction();
    this.onlineAction();
    this.offlineAction();
    this.openChatAction();
    this.closeChatAction();
    this.newMessageAction();
    this.friendRemoveAction();

    this.props.requestCloseChat(this.state.chatId, this.props.token);
    if (this.props.chatUser !== null) {
      let userId =
        this.props.chatUser === 0
          ? 0
          : parseInt(this.props.chatUser.id || this.props.chatUser._id, 10);
      this.props.updateAllMessages(
        `${this.props.user.id}-${userId}`,
        this.props.messages,
      );
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isOnline !== this.state.isOnline) {
      this._pushCount = 0;
    }

    if (prevProps.isConnected === false && this.props.isConnected === true) {
      this.onSendOfflineMsgs();
    }
  }

  checkingOnlineStatus = () => {
    const { chatUser } = this.props;
    if (chatUser === 0) return;
    let params = new FormData();
    params.append("user_id", chatUser.id || chatUser._id);
    API.request({
      method: "post",
      url: `${API_ENDPOINTS.CHECK_USER_STATUS}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + this.props.token,
      },
      data: params,
    })
      .then(response => {
        let data = response.data.data;
        if (data.online === 1) {
          this.setState({ isOnline: true });
        }
        // if (this.state.lastSeenTime === null) {
        //   this.setState({lastSeenTime: data.last_activity});
        // }
      })
      .catch(e => {
        console.log(e);
      });
  };

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
      if (this.state.sentSystemAlert === false) {
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
        this.setState({ sentSystemAlert: true });
      }
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
      cropping: false,
      mediaType: "photo",
      smartAlbums: [
        "PhotoStream",
        "Generic",
        "Panoramas",
        "Favorites",
        "Timelapses",
        "AllHidden",
        "RecentlyAdded",
        "Bursts",
        "UserLibrary",
        "SelfPortraits",
        "Screenshots",
        "DepthEffect",
        "LivePhotos",
        "LongExposure",
      ],
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

    if (this.props.isConnected) {
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
            message_info: {
              sent: 1,
              received: this.state.openedChat ? 1 : 0,
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
    } else {
      this.setState({
        offlineMessages: [
          {
            _id: moment().unix(),
            text: this.state.msgText,
            image: data.path,
            imageInfo: data,
            createdAt: new Date(),
            user: {
              _id: this.props.user.id,
              name: this.props.user.name || this.props.user.username,
              avatar: this.props.user.images[0].path,
            },
            message_info: {
              sent: 1,
              received: this.state.openedChat ? 1 : 0,
            },
          },
          ...this.state.offlineMessages,
        ],
      });
    }
    this.setState({ msgText: "" });
  };

  onSend = (messages = []) => {
    if (messages[0].text === "") return;
    if (this.props.isConnected) {
      messages[0].message_info = { sent: 1, received: this.state.openedChat ? 1 : 0 };
      this.props.updateMessages([messages[0]].concat(this.props.messages));

      let sendPush = 1;
      const { chatUser } = this.props;
      const params = {
        chatId: this.state.chatId,
        text: messages[0].text,
        image: null,
        sendTo: chatUser === 0 ? chatUser : chatUser.id || chatUser._id,
        send_push: sendPush,
      };
      const { token } = this.props;
      this.props.sendMessage(params, token);
    } else {
      messages[0].message_info = { sent: 0, received: this.state.openedChat ? 1 : 0 };
      this.setState({ offlineMessages: [messages[0], ...this.state.offlineMessages] });
    }
  };

  onSendOfflineMsgs = () => {
    let newMessages = this.state.offlineMessages;
    for (let msgIndex = 0; msgIndex < newMessages.length; msgIndex++) {
      this.setState({
        offlineMessages: this.state.offlineMessages.filter(
          (value, index) => index !== msgIndex,
        ),
      });
      if (
        newMessages[msgIndex].imageInfo === undefined ||
        newMessages[msgIndex].imageInfo === null
      ) {
        this.onSend([newMessages[msgIndex]]);
      } else {
        this.onUploadImage(newMessages[msgIndex].imageInfo);
      }
    }
  };

  onDeleteFriend = () => {
    const { chatUser } = this.props;

    let data = new FormData();
    data.append("username", chatUser.username);
    data.append("user_target_id", chatUser.id || chatUser._id);
    let url = `${API_ENDPOINTS.REMOVE_FRIEND}`;

    API.request({
      method: "post",
      url: url,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + this.props.token,
      },
      data,
    });
    this.setState({ visibleConfirmDelete: false });
  };

  renderNotification = () => {
    let fullname =
      this.props.chatUser === 0 ? "Pluzo Team" : this.props.chatUser.first_name;
    if (Platform.OS === "ios" && this.props.pushEnabled === false) {
      return (
        <Touchable
          style={styles.notifyContainer}
          onPress={() => {
            Notification.confirmAlert(
              "Get notified?",
              `Would you like to know when ${fullname} answer your message?`,
              "Open Settings",
              "Not now",
              async () => {
                await Linking.openSettings();
              },
            );
          }}
        >
          <LinearGradient
            colors={["#02FFF3", "#617FFF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.notifySubContainer}
          >
            <Image source={Images.app.icNotify} style={styles.notifyIcon} />
            <View>
              <Text style={styles.notifyTitle}>{`See when ${fullname} replies.`}</Text>
              <Text style={styles.notifySubText}>{"Enable push notifications."}</Text>
            </View>
          </LinearGradient>
        </Touchable>
      );
    }
    return null;
  };

  renderFooterView = () => {
    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={["Hello!", "Hey!", "Hey, how are you?", "Hi :)"]}
        contentContainerStyle={styles.firstMessagesContentContainer}
        keyExtractor={(item, index) => `first-${index}`}
        renderItem={({ item: item, index }) => {
          return (
            <Touchable
              onPress={() => {
                this.onSend([
                  {
                    _id: moment().unix(),
                    text: item,
                    image: null,
                    createdAt: new Date(),
                    user: {
                      _id: this.props.user.id,
                      name: this.props.user.name || this.props.user.username,
                      avatar: this.props.user.images[0].path,
                    },
                  },
                ]);
              }}
              style={styles.firstMessage}
            >
              <Text style={styles.firstMessageText}>{item}</Text>
            </Touchable>
          );
        }}
      />
    );
  };

  render() {
    const { chatUser, loading, messages } = this.props;
    let isFirstMsg =
      messages.filter(
        message =>
          !message.system && (message.user._id || message.user.id) === this.props.user.id,
      ).length === 0;
    return (
      <Screen hasHeader style={styles.container}>
        <Header
          user={chatUser}
          onBack={() => this.props.navigation.goBack()}
          onProfileView={() => {
            if (chatUser === 0) return;
            Keyboard.dismiss();
            this.props.navigation.navigate(SCREENS.PROFILE_VIEW, { user: chatUser });
          }}
          onReport={() => this.setState({ visibleUserSetting: true })}
          lastSeenTime={this.state.lastSeenTime}
          isOnline={this.state.isOnline}
        />
        <View style={styles.body}>
          {loading && messages.length === 0 ? (
            <ActivityIndicator
              size={"large"}
              color={"white"}
              style={styles.loadingIndicator}
            />
          ) : (
            <GiftedChat
              listViewProps={
                Platform.OS === "ios"
                  ? { keyboardDismissMode: "on-drag" }
                  : { onScrollBeginDrag: Keyboard.dismiss }
              }
              messages={[...this.state.offlineMessages, ...messages]}
              text={this.state.msgText}
              isKeyboardInternallyHandled={true}
              bottomOffset={this.props.insets.bottom}
              minComposerHeight={Platform.OS === "ios" ? 33 : 40}
              minInputToolbarHeight={Platform.OS === "ios" ? wp(62) : wp(66)}
              alwaysShowSend={true}
              containerStyle={{
                right: { marginBottom: 0 },
                left: { marginBottom: 0 },
              }}
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
                return (
                  <Avatar
                    {...avatarProps}
                    onPress={() => {
                      this.props.navigation.navigate(SCREENS.PROFILE_VIEW, {
                        user: chatUser,
                      });
                    }}
                  />
                );
              }}
              renderInputToolbar={props => {
                this.onSendNew = props.onSend;
                return (
                  <InputToolbar
                    {...props}
                    disableComposer={loading}
                    onAttachment={this.onAddAttachment}
                    onSendMessage={() => {
                      props.onSend({ text: this.state.msgText }, true);
                    }}
                  />
                );
              }}
              renderTime={props => {
                return <View />;
              }}
              renderSystemMessage={props => {
                return <SystemMessage {...props} containerStyle={styles.systemMessage} />;
              }}
              renderChatEmpty={() => {
                return <EmptyView user={chatUser} navigation={this.props.navigation} />;
              }}
              renderFooter={() => {
                if (isFirstMsg === false || chatUser === 0) {
                  return null;
                }
                return this.renderFooterView();
              }}
              user={{
                _id: this.props.user.id,
              }}
              onSend={msgs => this.onSend(msgs)}
              onInputTextChanged={msgText => this.setState({ msgText: msgText })}
            />
          )}
          {this.renderNotification()}
        </View>
        <ActionSheet
          ref={o => (this.ActionSheet = o)}
          title={"Select Image"}
          options={["Take Photo...", "Choose from Library...", "Cancel"]}
          cancelButtonIndex={2}
          onPress={index => this.onSelectImage(index)}
        />
        <UserSettingModal
          isVisible={this.state.visibleUserSetting}
          user={chatUser}
          onDismiss={() => this.setState({ visibleUserSetting: false })}
          onReport={() => {
            setTimeout(() => {
              this.setState({ visibleReport: true });
            }, 400);
          }}
          onBlock={() => {
            setTimeout(() => {
              this.setState({ visibleConfirmBlock: true });
            }, 400);
          }}
          onUnfriend={() => {
            setTimeout(() => {
              this.setState({ visibleConfirmDelete: true });
            }, 400);
          }}
        />
        <ReportModal
          isVisible={this.state.visibleReport}
          keyboardDisable={true}
          userId={chatUser.id || chatUser._id}
          onDismiss={() => this.setState({ visibleReport: false })}
        />
        <ConfirmModal
          isVisible={this.state.visibleConfirmBlock}
          user={chatUser}
          onDismiss={() => this.setState({ visibleConfirmBlock: false })}
          onConfirm={() => {
            this.props.blockUser(chatUser.id || chatUser._id, this.props.token);
            this.setState({ visibleConfirmBlock: false }, () => {
              setTimeout(() => {
                this.props.navigation.goBack();
              }, 1000);
            });
          }}
        />
        <NotificationModal
          isVisible={this.state.visibleConfirmDelete}
          onBack={() => this.setState({ visibleConfirmDelete: false })}
          onConfirm={(userId, userName) => {
            this.setState({ visibleConfirmDelete: false });
            this.onDeleteFriend();
          }}
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

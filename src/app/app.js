import React from "react";
import { StatusBar, Platform, AppState, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";
import KeyboardManager from "react-native-keyboard-manager";
import AsyncStorage from "@react-native-community/async-storage";
import NetInfo from "@react-native-community/netinfo";
import FastImage from "react-native-fast-image";
import EventBus from "eventing-bus";
import OneSignal from "react-native-onesignal";
import { connect } from "react-redux";
import { AppContainer } from "../screens";
import Loading from "../screens/loading";
import { WS, NoConnectionAlert } from "@components";
import { NavigationService, IapManager } from "@helpers";
import { SCREENS, TUTORIAL } from "@constants";
import { COLOR } from "@config";
import { UserCreators, InboxCreators, LiveCreators, AppCreators } from "@redux/actions";
import { userOnline } from "@redux/api";

if (Platform.OS === "ios") {
  KeyboardManager.setEnable(true);
  KeyboardManager.setKeyboardDistanceFromTextField(100);
  KeyboardManager.setEnableAutoToolbar(false);
  KeyboardManager.setShouldResignOnTouchOutside(true);
}

NetInfo.configure({
  reachabilityUrl: 'https://api.pluzo.com/',
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstLoading: true,
      appState: AppState.currentState,
    };
    this.openedTime = 0;
  }

  async componentDidMount() {
    try {
      let userToken = await AsyncStorage.getItem("USER_TOKEN");
      SplashScreen.hide();
      if (userToken) {
        this.setState({ firstLoading: true });
        this.props.requestProfile(userToken);
      } else {
        setTimeout(() => {
          this.setState({ firstLoading: false });
        }, 2500);
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
    AppState.addEventListener("change", this._handleAppStateChange);
    this._netUnsubscribe = NetInfo.addEventListener(state => {
      this.props.updateConnectionState(state.isConnected);
    });
    this._openedUnsubscribe = EventBus.on("AppState_Active", () => {
      this._countAppTime();
    });
    this._countAppTime();
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
    this._netUnsubscribe();
    this._openedUnsubscribe();
    if (this._opendInterval) {
      clearInterval(this._opendInterval);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loading === true && this.props.loading === false) {
      if (this.state.firstLoading) {
        setTimeout(() => {
          this.setState({ firstLoading: false });
        }, 1500);
      }
    }
  }

  _countAppTime = () => {
    this.openedTime = 0;
    if (this._opendInterval) {
      clearInterval(this._opendInterval);
      this._opendInterval = null;
    }
    this._opendInterval = setInterval(() => {
      this.openedTime += 1;
      if (this.openedTime === 420 && this.props.user && this.props.user.premium === 0) {
        this.props.showPluzo(true, "");
        this.openedTime = 0;
      }
    }, 1000);
  }

  _handleAppStateChange = nextAppState => {
    if (this.state.appState.match(/inactive|background|unknown/) && nextAppState === "active") {
      OneSignal.getPermissionSubscriptionState((status) => {
        this.props.updatePushStatus(status.notificationsEnabled);
      });
      this.props.token && userOnline(null, this.props.token, "online").catch(e => console.log(e));
      if (!this.state.firstLoading) {
        this.props.token && this.props.requestProfile(this.props.token);
        EventBus.publish("AppState_Active");
      }
    } else if (this.state.appState.match(/inactive/) && nextAppState === "background") {
      this.props.token && userOnline(null, this.props.token, "offline").then(res => console.log("offline")).catch(e => console.log(e));
      EventBus.publish("AppState_InActive");
    }
    this.setState({ appState: nextAppState });
  };

  _onInitTutorials = () => {
    AsyncStorage.multiRemove([
      TUTORIAL.MINIMIZED,
      TUTORIAL.USERS,
      TUTORIAL.KICK_BAN1,
      TUTORIAL.KICK_BAN2,
      TUTORIAL.SWIPE,
      TUTORIAL.POINTER,
      TUTORIAL.SHOW_GENDER,
    ]);
  }

  isLogin = () => {
    const { user, token } = this.props;
    if (user !== null && token !== "" && token !== null) {
      if (user.status === 1) {
        return true;
      }
    }
    return false;
  };

  checkingLogin = async () => {
    const { user, token } = this.props;
    if (user !== null && token !== undefined && token !== "" && token !== null) {
      if (token === this.oldToken) return;
      if (user.status === 1) {
        if (NavigationService.isNavigator()) {
          AsyncStorage.setItem("USER_TOKEN", token);
          FastImage.preload([{ uri: user.images[0].path }]);
          NavigationService.navigate(SCREENS.HOMESTACK);
          userOnline(null, token, "online");
          if (user.first_login === 1) {
            this._onInitTutorials();
            const params = new FormData();
            params.append("first_login", 0);
            this.props.updateUser(params, this.props.token);

            this.props.updateNotification({
              type: "chat",
              message: "Welcome to Pluzo 🌟",
              user: 0,
              chatId: null,
            });
          }
          this.oldToken = token;
        }
      } else {
        NavigationService.navigate(SCREENS.SIGNUP_CODE_VERIFICATION, {
          phoneNumber: user.phone,
        });
      }
    } else {
      AsyncStorage.removeItem("USER_TOKEN");
      NavigationService.navigate(SCREENS.AUTHSTACK);
      this.oldToken = token;
    }
  };

  onMessage = ev => {
    let data = JSON.parse(ev.data);
    if (data.action === "User_update") {
      let objData = JSON.parse(data.data);
      if (parseInt(objData.user._id, 10) === this.props.user.id) {
        let newProfile = objData.user;
        newProfile.id = parseInt(newProfile._id, 10);
        this.props.updateProfile(newProfile);
      }
      EventBus.publish("player_actions", "User_update", objData);
    } else if (data.action === "Friends") {
      //Friend_overlap
      if (this.props.user.id === data.user) {
        this.props.updateFriends(JSON.parse(data.data));
      }
    } else if (data.action === "Chat") {
      if (data.user === this.props.user.id) {
        EventBus.publish("NEW_MSG", data.data);
        let objData = JSON.parse(data.data);
        if (objData[0].type === "message" && parseInt(this.props.chatUserId, 10) !== objData[0].user._id) {
          this.props.updateNotification({
            type: "chat",
            message: objData[0].image !== null ? `${objData[0].user.first_name} sent an image` : objData[0].text,
            user: objData[0].user,
            chatId: objData[0].chat_id,
          });
        }
      }
    } else if (data.action === "Start_stream") {
      this.props.requestStreamList(this.props.token);
      let objData = JSON.parse(data.data);
      if (objData.friends.filter((value) => parseInt(value.id, 10) === this.props.user.id).length > 0) {
        this.props.updateNotification({
          type: "livefriend",
          stream: objData.stream,
          user: objData.host,
        });
      }
    } else if (data.action === "Stop_stream") {
      this.props.requestStreamList(this.props.token);
      EventBus.publish("player_actions", "StreamStopped", JSON.parse(data.data));
    } else if (data.action === "Stream_invite") {
      let objData = JSON.parse(data.data);
      if (data.user === this.props.user.id) {
        this.props.updateNotification({
          type: "livestream",
          stream: objData.stream,
          user: objData.host,
        });
      }
    } else if (data.action === "Friend_add") {
      let objData = JSON.parse(data.data);
      if (
        objData.user_target_id === this.props.user.id &&
        objData.friend_info.friend === 3
      ) {
        this.props.updateNotification({
          type: "friend",
          user: objData.host,
        });
        EventBus.publish(data.action);
        this.props.loadPendingRequests(this.props.token);
      }
    } else if (data.action === "Friend_remove") {
      let userData = JSON.parse(data.data);
      if (userData.host._id === this.props.user.id || 
        userData.user_target_id._id === this.props.user.id) {
        EventBus.publish("Need_Update_Friends");
        if (parseInt(this.props.chatUserId, 10) === parseInt(userData.host._id, 10) || 
          parseInt(this.props.chatUserId, 10) === parseInt(userData.user_target_id._id, 10)) {
          EventBus.publish("Need_Close_Chat");
        }
      }
    } else if (data.action === "Friend_overlap") {
      let userData = JSON.parse(data.data);
      if (userData.host._id === this.props.user.id || userData.user_target_id._id === this.props.user.id) {
        EventBus.publish("Need_Update_Friends");
        this.props.requestProfile(this.props.token);
        this.props.updateNotification({
          type: "friend-match",
          user: userData.host._id === this.props.user.id ? userData.user_target_id : userData.host,
        });
        let compareId = userData.host._id === this.props.user.id ? userData.user_target_id._id : userData.host._id;
        if (this.props.cards) {
          let tmpIndex = this.props.cards.findIndex((value) => value.id === parseInt(compareId, 10));
          if (tmpIndex !== -1) {
            EventBus.publish("Need_Update_Cards", tmpIndex);
          }
        }
      }
    } else if (
      data.action === "Stream_join_user" || 
      data.action === "Stream_disconnect_user" ||
      data.action === "Stream_ask_join" ||
      data.action === "Stream_refused_join" ||
      data.action === "Stream_broadcast_disconnect_by_host" ||
      data.action === "Stream_user_ask_join" ||
      data.action === "Stream_user_cancel_ask" ||
      data.action === "Stream_user_accept_join" ||
      data.action === "Stream_user_refused_join" ||
      data.action === "Update_badges" ||
      data.action === "Stream_user_kick" ||
      data.action === "Stream_user_ban") {
      EventBus.publish("player_actions", data.action, data.data);
    } else {
      EventBus.publish(data.action, data.data);
    }
  };

  render() {
    if (this.state.firstLoading) {
      return (
        <SafeAreaProvider>
          <StatusBar barStyle='light-content' backgroundColor={COLOR.HEADER_BACKGROUND} />
          <Loading />
        </SafeAreaProvider>
      );
    }

    return (
      <SafeAreaProvider>
        <StatusBar barStyle='light-content' backgroundColor={COLOR.HEADER_BACKGROUND} />
        <AppContainer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
            this.checkingLogin();
          }}
          uriPrefix={"pluzo://"}
        />
        {!this.props.isConnected &&
        <View style={{position: "absolute", top: 0, left: 0, right: 0}}>
          <NoConnectionAlert />
        </View>}
        {this.isLogin() && (
          <WS
            url={"ws://3.18.139.193:27801?user=" + this.props.user.id}
            onMessage={this.onMessage}
            onOpen={() => console.log("Opened socket")}
            onError={(error) => console.log(error)}
            onClose={() => console.log("Closed socket")}
            reconnect
            isActive={this.state.appState}
          />
        )}
        {this.isLogin() && <IapManager />}
      </SafeAreaProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.user.token,
    user: state.user.user,
    loading: state.user.isLoadingProfile,
    chatUserId: state.chat.chatUserId,
    cards: state.swipe.cards,
    isConnected: state.app.isConnected,
  };
}

const mapDispatchToProps = {
  updateConnectionState: AppCreators.updateConnectionState,
  updatePushStatus: UserCreators.updatePushStatus,
  requestProfile: UserCreators.requestProfile,
  requestStreamList: LiveCreators.requestStreamList,
  updateNotification: UserCreators.updateNotification,
  updateProfile: UserCreators.updateUserSuccess,
  updateUser: UserCreators.requestUpdateUser,
  updateFriends: InboxCreators.requestFriendsSuccess,
  loadPendingRequests: InboxCreators.requestPendingFriends,
  showPluzo: AppCreators.showPluzo,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

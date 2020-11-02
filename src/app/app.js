import React from "react";
import { StatusBar, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";
import KeyboardManager from "react-native-keyboard-manager";
import AsyncStorage from "@react-native-community/async-storage";
import FastImage from "react-native-fast-image";
import EventBus from "eventing-bus";
import { connect } from "react-redux";
import { AppContainer } from "../screens";
import Loading from "../screens/loading";
import { WS } from "@components";
import { NavigationService, IapManager } from "@helpers";
import { SCREENS } from "@constants";
import { COLOR } from "@config";
import { UserCreators, InboxCreators, LiveCreators } from "../redux/actions";

if (Platform.OS === "ios") {
  KeyboardManager.setEnable(true);
  KeyboardManager.setKeyboardDistanceFromTextField(100);
  KeyboardManager.setEnableAutoToolbar(false);
  KeyboardManager.setShouldResignOnTouchOutside(true);
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstLoading: true,
    };
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
        }, 3000);
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loading === true && this.props.loading === false) {
      if (this.state.firstLoading) {
        setTimeout(() => {
          this.setState({ firstLoading: false });
        }, 2500);
      }
    }
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
      if (user.status === 1) {
        AsyncStorage.setItem("USER_TOKEN", token);
        FastImage.preload([{ uri: user.images[0].path }]);
        NavigationService.navigate(SCREENS.HOMESTACK);
      } else {
        NavigationService.navigate(SCREENS.SIGNUP_CODE_VERIFICATION, {
          phoneNumber: user.phone,
        });
      }
    } else {
      AsyncStorage.removeItem("USER_TOKEN");
      NavigationService.navigate(SCREENS.AUTHSTACK);
    }
  };

  onMessage = ev => {
    let data = JSON.parse(ev.data);
    if (data.action === "User_update") {
      let objData = JSON.parse(data.data);
      if (objData.user._id === this.props.user.id) {
        let newProfile = objData.user;
        newProfile.id = newProfile._id;
        this.props.updateProfile(newProfile);
      }
      EventBus.publish("User_update", objData);
    } else if (data.action === "Friends") {
      //Friend_overlap
      console.log(data.data);
      if (this.props.user.id === data.user) {
        this.props.updateFriends(JSON.parse(data.data));
      }
    } else if (data.action === "Chat") {
      if (data.user === this.props.user.id) {
        EventBus.publish("NEW_MSG", data.data);
        let objData = JSON.parse(data.data);
        if (objData[0].type === "message") {
          this.props.updateNotification({
            type: "chat",
            message: objData[0].text,
            user: objData[0].user,
          });
        }
      }
    } else if (data.action === "Start_stream") {
      this.props.requestStreamList(this.props.token);
    } else if (data.action === "Stop_stream") {
      this.props.requestStreamList(this.props.token);
      EventBus.publish("StreamStopped", JSON.parse(data.data));
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
        />
        {this.isLogin() && (
          <WS
            url={"ws://3.134.208.235:27800?user=" + this.props.user.id}
            onMessage={this.onMessage}
            onError={console.log}
            onClose={console.log}
            reconnect
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
  };
}

const mapDispatchToProps = {
  requestProfile: UserCreators.requestProfile,
  requestStreamList: LiveCreators.requestStreamList,
  updateNotification: UserCreators.updateNotification,
  updateProfile: UserCreators.updateUserSuccess,
  updateFriends: InboxCreators.requestFriendsSuccess,
  loadPendingRequests: InboxCreators.requestPendingFriends,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React from "react";
import { StatusBar, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import KeyboardManager from "react-native-keyboard-manager";
import Geolocation from "react-native-geolocation-service";
import AsyncStorage from "@react-native-community/async-storage";
import EventBus from "eventing-bus";
import { connect } from "react-redux";
import { AppContainer } from "../screens";
import Loading from "../screens/loading";
import { NavigationService } from "@helpers";
import { SCREENS } from "@constants";
import { COLOR } from "../config/color";
import { getLocationUpdates } from "@helpers";
import { UserCreators, InboxCreators } from "../redux/actions";

if (Platform.OS === "ios") {
  KeyboardManager.setKeyboardDistanceFromTextField(100);
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.watchId = null;
    this.wsSocket = null;
  }

  async componentDidMount() {
    this.watchId = getLocationUpdates(this.props.updateLocation);

    try {
      let userToken = await AsyncStorage.getItem("USER_TOKEN");
      if (userToken) {
        this.props.requestProfile(userToken);
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  componentWillUnmount() {
    if (this.watchId !== null) {
      Geolocation.clearWatch(this.watchId);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.token !== this.props.token) {
      this.checkingLogin();
    }
  }

  checkingLogin = () => {
    const { user, token } = this.props;
    if (user !== null && token !== "" && token !== null) {
      if (user.status === 1) {
        this.connectSocket(user.id);
        AsyncStorage.setItem("USER_TOKEN", token);
        NavigationService.navigate(SCREENS.HOMESTACK);
      } else {
        NavigationService.navigate(SCREENS.SIGNUP_CODE_VERIFICATION, {
          phoneNumber: user.phone,
        });
      }
    } else {
      if (this.wsSocket !== null) {
        this.wsSocket.close();
        this.wsSocket = null;
      }
      AsyncStorage.removeItem("USER_TOKEN");
      NavigationService.navigate(SCREENS.AUTHSTACK);
    }
  };

  connectSocket = userId => {
    if (this.wsSocket !== null) {
      this.wsSocket.close();
      this.wsSocket = null;
    }
    this.wsSocket = new WebSocket("ws://3.134.208.235:27800?user=" + userId);
    this.wsSocket.onmessage = ev => {
      let data = JSON.parse(ev.data);
      if (data.action === "Friends") {
        this.props.updateFriends(data.data);
      } else if (data.action === "Chat") {
        EventBus.publish("NEW_MSG", data.data);
      } else {
        console.log("Socket: >>", data);
      }
    };
  };

  render() {
    if (this.props.loading) {
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
  updateLocation: UserCreators.updateLocation,
  updateFriends: InboxCreators.requestFriendsSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

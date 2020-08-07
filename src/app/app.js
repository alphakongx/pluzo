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
import { WS } from "@components";
import { NavigationService } from "@helpers";
import { SCREENS } from "@constants";
import { COLOR } from "../config/color";
import { getLocationUpdates } from "@helpers";
import { UserCreators, InboxCreators } from "../redux/actions";

if (Platform.OS === "ios") {
  KeyboardManager.setKeyboardDistanceFromTextField(100);
  KeyboardManager.setEnableAutoToolbar(false);
  KeyboardManager.setShouldResignOnTouchOutside(true);
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.watchId = null;
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
    if (user !== null && token !== "" && token !== null) {
      if (user.status === 1) {
        AsyncStorage.setItem("USER_TOKEN", token);
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
    console.log("Socket: >>", this.props.user.id, data);
    if (data.action === "Friends") {
      this.props.updateFriends(data.data);
    } else if (data.action === "Chat") {
      EventBus.publish("NEW_MSG", data.data);
    } else {
      // console.log("Socket: >>", this.props.user.id, data);
    }
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
        {this.isLogin() && (
          <WS
            url={"ws://3.134.208.235:27800?user=" + this.props.user.id}
            onMessage={this.onMessage}
            onError={console.log}
            onClose={console.log}
            reconnect
          />
        )}
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

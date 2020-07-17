import React from "react";
import {
  StatusBar,
  Linking,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import KeyboardManager from "react-native-keyboard-manager";
import Geolocation from "react-native-geolocation-service";
import { connect } from "react-redux";
import { AppContainer } from "../screens";
import { NavigationService } from "@helpers";
import { SCREENS } from "@constants";
import { COLOR } from "../config/color";
import { Notification } from "@helpers";
import { UserCreators } from "../redux/actions";

if (Platform.OS === "ios") {
  KeyboardManager.setKeyboardDistanceFromTextField(100);
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.watchId = null;
  }

  componentDidMount() {
    this.getLocationUpdates();
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
    if (user !== null && token !== "") {
      if (user.status === 1) {
        NavigationService.navigate(SCREENS.HOMESTACK);
      } else {
        NavigationService.navigate(SCREENS.SIGNUP_CODE_VERIFICATION, {phoneNumber: user.phone});
      }
    } else {
      NavigationService.navigate(SCREENS.AUTHSTACK);
    }
  };

  hasLocationPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Notification.alert("Unable to open settings");
      });
    };
    const status = await Geolocation.requestAuthorization("whenInUse");

    if (status === "granted") {
      return true;
    }

    if (status === "denied") {
      Notification.alert("Location permission denied");
    }

    if (status === "disabled") {
      Notification.alert(
        `Turn on Location Services to allow Pluzo to determine your location.`,
        "",
        [
          { text: "Go to Settings", onPress: openSetting },
          { text: "Don't Use Location", onPress: () => {} },
        ],
      );
    }

    return false;
  };

  hasLocationPermission = async () => {
    if (Platform.OS === "ios") {
      const hasPermission = await this.hasLocationPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === "android" && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show("Location permission denied by user.", ToastAndroid.LONG);
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show("Location permission revoked by user.", ToastAndroid.LONG);
    }

    return false;
  };

  getLocationUpdates = async () => {
    const hasLocationPermission = await this.hasLocationPermission();

    if (!hasLocationPermission) {
      return;
    }

    this.watchId = Geolocation.watchPosition(
      position => {
        this.props.updateLocation(position);
        console.log(position);
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 100,
        interval: 6000,
        fastestInterval: 10000,
        forceRequestLocation: true,
        showLocationDialog: true,
        useSignificantChanges: true,
      },
    );
  };

  render() {
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
  };
}

const mapDispatchToProps = {
  updateLocation: UserCreators.updateLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

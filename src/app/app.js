import React, { useEffect } from "react";
import { Platform, StatusBar } from "react-native";
import { AppContainer } from "../screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import KeyboardManager from "react-native-keyboard-manager";
import { connect } from "react-redux";
import { NavigationService } from "@helpers";
import { SCREENS } from "@constants";
import { COLOR } from "../config/color";

if (Platform.OS === "ios") {
  KeyboardManager.setKeyboardDistanceFromTextField(100);
}

const App: () => React$Node = props => {
  useEffect(() => {
    if (props.user !== null && props.user.token !== "") {
      if (props.user.status === 1) {
        NavigationService.navigate(SCREENS.HOMESTACK);
        return;
      }
    }
    NavigationService.navigate(SCREENS.AUTHSTACK);
  }, [props.user, props.token]);

  const checkingLogin = () => {
    if (props.user !== null && props.user.token !== "") {
      if (props.user.status === 1) {
        NavigationService.navigate(SCREENS.HOMESTACK);
        return;
      }
    }
    NavigationService.navigate(SCREENS.AUTHSTACK);
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle='light-content' backgroundColor={COLOR.HEADER_BACKGROUND} />
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
          checkingLogin();
        }}
      />
    </SafeAreaProvider>
  );
};

function mapStateToProps(state) {
  return {
    token: state.user.token,
    user: state.user.user,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);

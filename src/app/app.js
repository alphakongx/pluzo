import React from "react";
import { Platform, StatusBar } from "react-native";
import { AppContainer } from "../screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import KeyboardManager from "react-native-keyboard-manager";
import { connect } from "react-redux";
import { NavigationService } from "@helpers";

if (Platform.OS === "ios") {
  KeyboardManager.setKeyboardDistanceFromTextField(100);
}

const App: () => React$Node = props => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle='dark-content' />
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    </SafeAreaProvider>
  );
};

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React from 'react';
import {Platform} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import KeyboardManager from 'react-native-keyboard-manager';
import {connect} from 'react-redux';

if (Platform.OS === 'ios') {
  KeyboardManager.setKeyboardDistanceFromTextField(65);
}

const App: () => React$Node = props => {
  return <SafeAreaProvider />;
};

function mapStateToProps(state) {
  const {
    session: {user},
  } = state;
  let inboxChannel = user ? user.mobile_notification_channel : null;

  return {
    inboxChannel,
    session: state.session,
  };
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

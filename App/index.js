import React from "react";
import "react-native-gesture-handler";
import "../src/i18n";
import { Provider } from "react-redux";
import codePush from "react-native-code-push";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "../src/redux/store";
import App from "./app";

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.MANUAL,
};

const AppContainer: () => React$Node = () => {
  const { store, persistor } = configureStore();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

export default codePush(codePushOptions)(AppContainer);

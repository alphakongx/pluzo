import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "../redux/store";
import initialState from "../redux/store/initial-state";
import "../locale/i18n";
import App from "./app";

const AppContainer: () => React$Node = () => {
  const { store, persistor } = configureStore(initialState);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

export default AppContainer;

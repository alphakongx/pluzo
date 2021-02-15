import { createReducer } from "reduxsauce";
import { AppTypes } from "../actions";
import storeInitialState from "../store/initial-state";
export const INITIAL_STATE = storeInitialState.app;

const updateConnectionState = (state, action) => ({
  ...state,
  isConnected: action.connected,
});

export const HANDLERS = {
  [AppTypes.UPDATE_CONNECTION_STATE]: updateConnectionState,
};

export default createReducer(INITIAL_STATE, HANDLERS);

import { createReducer } from "reduxsauce";
import { AppTypes, UserTypes } from "../actions";
import storeInitialState from "../store/initial-state";
export const INITIAL_STATE = storeInitialState.app;

const logout = (state, action) => ({
  ...state,
  visiblePurchase: false,
  visiblePluzo: false,
  pluzoType: "",
  modalShowed: false,
});

const updateConnectionState = (state, action) => ({
  ...state,
  isConnected: action.connected,
});

const showPurchase = (state, action) => ({
  ...state,
  visiblePurchase: action.visible,
});

const showPluzo = (state, action) => ({
  ...state,
  visiblePluzo: action.visible,
  pluzoType: action.pluzoType,
});

const updateModalShowed = (state, action) => ({
  ...state,
  modalShowed: action.show,
});

export const HANDLERS = {
  [AppTypes.UPDATE_CONNECTION_STATE]: updateConnectionState,
  [AppTypes.SHOW_PURCHASE]: showPurchase,
  [AppTypes.SHOW_PLUZO]: showPluzo,
  [AppTypes.UPDATE_MODAL_SHOWED]: updateModalShowed,

  [UserTypes.LOGOUT]: logout,
};

export default createReducer(INITIAL_STATE, HANDLERS);

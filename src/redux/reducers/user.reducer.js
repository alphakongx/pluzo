import { createReducer } from "reduxsauce";
import { UserTypes } from "../actions";
import storeInitialState from "../store/initial-state";
export const INITIAL_STATE = storeInitialState.user;

const logout = (state, action) => INITIAL_STATE;

const schoolLoginSuccess = (state, action) => ({
  ...state,
  ...action.user,
});

export const HANDLERS = {
  [UserTypes.LOGIN_SUCCESS]: schoolLoginSuccess,
  [UserTypes.LOGOUT]: logout,
};

export default createReducer(INITIAL_STATE, HANDLERS);

import { createReducer } from "reduxsauce";
import { InboxTypes, UserTypes } from "../actions";
import storeInitialState from "../store/initial-state";
export const INITIAL_STATE = storeInitialState.inbox;

const logout = (state, action) => INITIAL_STATE;

const requestChannels = (state, action) => ({
  ...state,
  isLoadingChannels: true,
});

const loadChannelsDone = (state, action) => ({
  ...state,
  isLoadingChannels: false,
});

export const HANDLERS = {
  [InboxTypes.REQUEST_CHANNELS]: requestChannels,
  [InboxTypes.LOAD_CHANNELS_DONE]: loadChannelsDone,
  [UserTypes.LOGOUT]: logout,
};

export default createReducer(INITIAL_STATE, HANDLERS);

import { reducer as formReducer } from "redux-form";
import { combineReducers } from "redux";

import regitrationReducer from "./registration.reducer";
import userReducer from "./user.reducer";
import inboxReducer from "./inbox.reducer";
import swipeReducer from "./swipe.reducer";

const rootReducer = combineReducers({
  registration: regitrationReducer,
  user: userReducer,
  inbox: inboxReducer,
  swipe: swipeReducer,
  form: formReducer,
});

export default rootReducer;

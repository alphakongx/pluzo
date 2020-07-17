import { reducer as formReducer } from "redux-form";
import { combineReducers } from "redux";

import regitrationReducer from "./registration.reducer";
import userReducer from "./user.reducer";
import inboxReducer from "./inbox.reducer";
import swipeReducer from "./swipe.reducer";
import searchReducer from "./search.reducer";

const rootReducer = combineReducers({
  registration: regitrationReducer,
  user: userReducer,
  inbox: inboxReducer,
  swipe: swipeReducer,
  search: searchReducer,
  form: formReducer,
});

export default rootReducer;

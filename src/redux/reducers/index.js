import { reducer as formReducer } from "redux-form";
import { combineReducers } from "redux";

import userReducer from "./user.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  form: formReducer,
});

export default rootReducer;

import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  requestLogin: ["params"],
  loginSuccess: ["user"],
  loginFailure: null,

  logout: null,
});

export const UserTypes = Types;
export const UserCreators = Creators;

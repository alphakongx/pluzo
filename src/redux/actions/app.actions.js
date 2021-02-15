import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  updateConnectionState: ["connected"],
});

export const AppTypes = Types;
export const AppCreators = Creators;

import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  updateConnectionState: ["connected"],
  showPurchase: ["visible"],
  showPluzo: ["visible", "pluzoType"],
  updateModalShowed: ["show"],
});

export const AppTypes = Types;
export const AppCreators = Creators;

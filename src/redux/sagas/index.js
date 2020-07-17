import { all } from "redux-saga/effects";
import { watchUserRequests } from "./user.sagas";
import { watchInboxRequests } from "./inbox.sagas";
import { watchSwipeRequests } from "./swipe.sagas";
import { watchSearchRequests } from "./search.sagas";

export function* rootSaga() {
  yield all([watchUserRequests(), watchInboxRequests(), watchSwipeRequests(), watchSearchRequests()]);
}

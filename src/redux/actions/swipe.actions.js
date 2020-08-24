import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  requestCards: ["token"],
  requestCardsSuccess: ["swipeData"],
  requestCardsFail: null,

  addLike: ["token", "userId"],
  addLikeSuccess: null,
  addLikeFail: null,

  addLikes: ["token", "userIds"],
  addLikesSuccess: null,
  addLikesFail: null,

  addDisLike: ["token", "userId"],
  addSuperLike: ["token", "userId"],

  requestMatch: ["token"],
  requestMatchSuccess: null,
  requestMatchFail: null,

  setVisibleDetail: ["visibleDetail"],
});

export const SwipeTypes = Types;
export const SwipeCreators = Creators;

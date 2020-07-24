import { createReducer } from "reduxsauce";
import { SwipeTypes, UserTypes } from "../actions";
import storeInitialState from "../store/initial-state";
export const INITIAL_STATE = storeInitialState.swipe;

const logout = (state, action) => INITIAL_STATE;

const requestCards = (state, action) => ({
  ...state,
  isLoadingCards: true,
});

const requestCardsSuccess = (state, action) => ({
  ...state,
  cards: action.swipeData.swipe,
  likecount: action.swipeData.like_info.like,
  isLoadingCards: false,
});

const requestCardsFail = (state, action) => ({
  ...state,
  isLoadingCards: false,
});

const addLike = (state, action) => ({
  ...state,
});
const addLikeSuccess = (state, action) => ({
  ...state,
});
const addLikeFail = (state, action) => ({
  ...state,
});

const addLikes = (state, action) => ({
  ...state,
});
const addLikesSuccess = (state, action) => ({
  ...state,
});
const addLikesFail = (state, action) => ({
  ...state,
});

const addDisLike = (state, action) => ({
  ...state,
});
const addSuperLike = (state, action) => ({
  ...state,
});

const requestMatch = (state, action) => ({
  ...state,
  isLoadingMatch: true,
});
const requestMatchSuccess = (state, action) => ({
  ...state,
  isLoadingMatch: false,
});
const requestMatchFail = (state, action) => ({
  ...state,
  isLoadingMatch: false,
});

const updateCardImageIndex = (state, action) => ({
  ...state,
  cardImageIndex: action.index,
});

export const HANDLERS = {
  [SwipeTypes.REQUEST_CARDS]: requestCards,
  [SwipeTypes.REQUEST_CARDS_SUCCESS]: requestCardsSuccess,
  [SwipeTypes.REQUEST_CARDS_FAIL]: requestCardsFail,

  [SwipeTypes.ADD_LIKE]: addLike,
  [SwipeTypes.ADD_LIKE_SUCCESS]: addLikeSuccess,
  [SwipeTypes.ADD_LIKE_FAIL]: addLikeFail,

  [SwipeTypes.ADD_LIKES]: addLikes,
  [SwipeTypes.ADD_LIKES_SUCCESS]: addLikesSuccess,
  [SwipeTypes.ADD_LIKES_FAIL]: addLikesFail,

  [SwipeTypes.ADD_DIS_LIKE]: addDisLike,
  [SwipeTypes.ADD_SUPER_LIKE]: addSuperLike,

  [SwipeTypes.REQUEST_MATCH]: requestMatch,
  [SwipeTypes.REQUEST_MATCH_SUCCESS]: requestMatchSuccess,
  [SwipeTypes.REQUEST_MATCH_FAIL]: requestMatchFail,

  [SwipeTypes.UPDATE_CARD_IMAGE_INDEX]: updateCardImageIndex,

  [UserTypes.LOGOUT]: logout,
};

export default createReducer(INITIAL_STATE, HANDLERS);

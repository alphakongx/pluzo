import { call, put, takeEvery } from "redux-saga/effects";
import { SwipeCreators, SwipeTypes } from "../actions";
import { getCards, sendLike, sendLikeAll, getMatchUsers } from "@redux/api";

export function* watchSwipeRequests() {
  yield takeEvery(SwipeTypes.REQUEST_CARDS, requestCards);
  yield takeEvery(SwipeTypes.ADD_LIKE, addLike);
  yield takeEvery(SwipeTypes.ADD_LIKES, addLikes);
  yield takeEvery(SwipeTypes.ADD_DIS_LIKE, addDisLike);
  yield takeEvery(SwipeTypes.ADD_SUPER_LIKE, addSuperLike);
  yield takeEvery(SwipeTypes.REQUEST_MATCH, requestMatch);
}

function* requestCards(action) {
  try {
    const { token } = action;

    var response = yield call(getCards, token);
    // response.data.data.swipe = response.data.data.swipe.filter((value) => value.image !== null);

    yield put(SwipeCreators.requestCardsSuccess(response.data.data));
  } catch (error) {
    yield put(SwipeCreators.requestCardsFail());
  }
}

function* addLike(action) {
  try {
    const { token, userId } = action;

    const params = new FormData();
    params.append("user_target_id", userId);
    params.append("is_like", "1");
    yield call(sendLike, params, token);

    yield put(SwipeCreators.addLikeSuccess());
  } catch (error) {
    yield put(SwipeCreators.addLikeFail());
  }
}

function* addLikes(action) {
  try {
    const { token, userIds } = action;

    const params = new FormData();
    userIds.forEach(userId => {
      params.append("user_target_id[]", userId);
    });
    yield call(sendLikeAll, params, token);

    yield put(SwipeCreators.addLikesSuccess());
  } catch (error) {
    yield put(SwipeCreators.addLikesFail());
  }
}

function* addDisLike(action) {
  try {
    const { token, userId } = action;

    const params = new FormData();
    params.append("user_target_id", userId);
    params.append("is_like", "0");
    yield call(sendLike, params, token);
  } catch (error) {
    console.log(error);
  }
}

function* addSuperLike(action) {
  try {
    const { token, userId } = action;

    const params = new FormData();
    params.append("user_target_id", userId);
    params.append("is_like", "2");
    yield call(sendLike, params, token);
  } catch (error) {
    console.log(error);
  }
}

function* requestMatch(action) {
  try {
    const { token } = action;

    yield call(getMatchUsers, token);

    yield put(SwipeCreators.requestMatchSuccess());
  } catch (error) {
    yield put(SwipeCreators.requestMatchFail());
  }
}

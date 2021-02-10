import Swipe from "./swipe.screen";
import { connect } from "react-redux";
import { SwipeCreators, UserCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    token: state.user.token,
    user: state.user.user,
    cards: state.swipe.cards,
    isLoadingCards: state.swipe.isLoadingCards,
    settings: state.swipe.settings,
  };
}

const mapDispatchToProps = {
  loadCards: SwipeCreators.requestCards,
  addLike: SwipeCreators.addLike,
  addDisLike: SwipeCreators.addDisLike,
  addSuperLike: SwipeCreators.addSuperLike,
  addSuperLikeDone: SwipeCreators.addSuperLikeDone,
  runBoost: SwipeCreators.requestRunBoost,
  runRewinds: SwipeCreators.requestRunRewinds,
  updateUser: UserCreators.requestUpdateUser,
  updateTutorialMode: SwipeCreators.updateTutorialMode,
  updateSettings: SwipeCreators.requestSetSettings,
  updateCards: SwipeCreators.requestCardsUpdate,
  loadSettings: SwipeCreators.requestGetSettings,
};

export default connect(mapStateToProps, mapDispatchToProps)(Swipe);

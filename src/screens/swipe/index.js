import Swipe from "./swipe.screen";
import { connect } from "react-redux";
import { SwipeCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    token: state.user.token,
    user: state.user.user,
    cards: state.swipe.cards,
    likecount: state.swipe.likecount,
    isLoadingCards: state.swipe.isLoadingCards,
    visibleDetail: state.swipe.visibleDetail,
  };
}

const mapDispatchToProps = {
  loadCards: SwipeCreators.requestCards,
  addLike: SwipeCreators.addLike,
  addDisLike: SwipeCreators.addDisLike,
  addSuperLike: SwipeCreators.addSuperLike,
  setVisibleDetail: SwipeCreators.setVisibleDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(Swipe);

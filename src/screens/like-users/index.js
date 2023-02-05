import LikeUsersScreen from "./like-users.screen";
import { connect } from "react-redux";
import { SwipeCreators, AppCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    token: state.user.token,
    user: state.user.user,
    isBoosting: state.swipe.isBoosting,
  };
}

const mapDispatchToProps = {
  addLike: SwipeCreators.addLike,
  addDisLike: SwipeCreators.addDisLike,
  runBoost: SwipeCreators.requestRunBoost,
  showPurchase: AppCreators.showPurchase,
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeUsersScreen);

import ActionButtonsView from "./action-buttons-view";
import { connect } from "react-redux";
import { SwipeCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    token: state.user.token,
    user: state.user.user,
    isSuperLiking: state.swipe.isSuperLiking,
    isBoosting: state.swipe.isBoosting,
  };
}

const mapDispatchToProps = {
  addSuperLikeStart: SwipeCreators.addSuperLikeStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionButtonsView);

import LikeUsersScreen from "./like-users.screen";
import { connect } from "react-redux";
import { SwipeCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    token: state.user.token,
    user: state.user.user,
  };
}

const mapDispatchToProps = {
  addLike: SwipeCreators.addLike,
  addDisLike: SwipeCreators.addDisLike,
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeUsersScreen);

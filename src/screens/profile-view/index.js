import ProfileView from "./profile-view.screen";
import { connect } from "react-redux";
import { UserCreators, InboxCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    token: state.user.token,
    owner: state.user.user,
    pendingFriends: state.inbox.pendingFriends,
  };
}

const mapDispatchToProps = {
  blockUser: UserCreators.requestBlockUser,
  updatePendings: InboxCreators.updatePendingFriends,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);

import Inbox from "./inbox.screen";
import { connect } from "react-redux";
import { InboxCreators, UserCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    token: state.user.token,
    user: state.user.user,
    pendingFriends: state.inbox.pendingFriends,
  };
}

const mapDispatchToProps = {
  loadFriends: InboxCreators.requestFriends,
  requestChannels: InboxCreators.requestChannels,
  requestPageTime: UserCreators.requestPageTime,
};

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);

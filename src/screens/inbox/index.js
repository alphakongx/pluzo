import Inbox from "./inbox.screen";
import { connect } from "react-redux";
import { InboxCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    token: state.user.token,
    user: state.user.user,
    pendingFriends: state.inbox.pendingFriends,
  };
}

const mapDispatchToProps = {
  loadFriends: InboxCreators.requestFriends,
  readFlag: InboxCreators.requestReadFlag,
};

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);

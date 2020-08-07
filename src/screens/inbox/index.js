import Inbox from "./inbox.screen";
import { connect } from "react-redux";
import { InboxCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    token: state.user.token,
  };
}

const mapDispatchToProps = {
  loadFriends: InboxCreators.requestFriends,
};

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);

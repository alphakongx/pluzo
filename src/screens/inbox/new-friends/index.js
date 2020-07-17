import NewFriends from "./new-friends";
import { connect } from "react-redux";
import { InboxCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    isLoadingFriends: state.inbox.isLoadingFriends,
    friends: state.inbox.friends,
    token: state.user.token,
  };
}

const mapDispatchToProps = {
  loadFriends: InboxCreators.requestFriends,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewFriends);

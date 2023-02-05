import ModalFriendItem from "./modal-friend-item";
import { connect } from "react-redux";
import { InboxCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    token: state.user.token,
    broadcasters: state.live.broadcasters,
    audiences: state.live.audiences,
  };
}

const mapDispatchToProps = {
  addFriend: InboxCreators.requestAddFriend,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalFriendItem);

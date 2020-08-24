import LiveUsers from "./live-users";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    token: state.user.token,
    user: state.user.user,
    streamUsers: state.live.friendStreams,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LiveUsers);

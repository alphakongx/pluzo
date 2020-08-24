import StreamUsers from "./stream-users";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    currentStream: state.live.currentStream,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(StreamUsers);

import SafetyPrivacy from "./safety-privacy";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    token: state.user.token,
    user: state.user.user,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SafetyPrivacy);

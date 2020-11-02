import UserProfile from "./user-profile";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    user: state.user.user,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

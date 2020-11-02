import ProfileView from "./profile-view.screen";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    token: state.user.token,
    owner: state.user.user,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);

import ProfileDetails from "./profile-details";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    location: state.user.location,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetails);

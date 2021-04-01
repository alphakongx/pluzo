import LocationPermissionScreen from "./location-permission";
import { connect } from "react-redux";
import { UserCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    user: state.user.user,
    token: state.user.token,
  };
}

const mapDispatchToProps = {
  updateUser: UserCreators.requestUpdateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationPermissionScreen);

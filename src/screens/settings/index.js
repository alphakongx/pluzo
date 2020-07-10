import Settings from "./settings.screen";
import { connect } from "react-redux";
import { UserCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    token: state.user.token,
  };
}

const mapDispatchToProps = {
  logout: UserCreators.logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

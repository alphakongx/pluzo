import LoginPhoneNumber from "./login-phone-number.screen";
import { connect } from "react-redux";
import { UserCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    isCheckingPhone: state.user.isCheckingPhone,
  };
}

const mapDispatchToProps = {
  requestCheckPhone: UserCreators.requestCheckPhone,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPhoneNumber);

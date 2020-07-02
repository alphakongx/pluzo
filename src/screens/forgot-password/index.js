import ForgotPassword from "./forgot-password.screen";
import { connect } from "react-redux";
import { UserCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    isSendingCode: state.user.isSendingForgotPasswordCode,
  };
}

const mapDispatchToProps = {
  requestForgotPasswordSendCode: UserCreators.requestForgotPasswordSendCode,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);

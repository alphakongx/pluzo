import LoginPhoneNumber from "./login-phone-number.screen";
import { connect } from "react-redux";
import { UserCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    isSendingCode: state.user.isSendingPhoneLoginCode,
  };
}

const mapDispatchToProps = {
  requestPhoneLoginSendCode: UserCreators.requestPhoneLoginSendCode,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPhoneNumber);

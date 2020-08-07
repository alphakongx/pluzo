import SignupUsername from "./signup-username.screen";
import { connect } from "react-redux";
import { RegistrationCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    username: state.registration.username,
    password: state.registration.password,
    isChecking: state.registration.isCheckingUsername,
  };
}

const mapDispatchToProps = {
  setUsername: RegistrationCreators.setUsername,
  setPassword: RegistrationCreators.setPassword,
  checkUsername: RegistrationCreators.requestCheckUsername,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupUsername);

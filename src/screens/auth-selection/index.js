import AuthSelection from "./auth-selection.screen";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { UserCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {
  updateLocation: UserCreators.updateLocation,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(AuthSelection));

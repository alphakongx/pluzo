import PluzoLearnModel from "./pluzo-learn-modal";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    user: state.user.user,
    pluzoType: state.app.pluzoType,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PluzoLearnModel);

import SwipeSettings from "./swipe-settings.screen";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    token: state.user.token,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SwipeSettings);

import PushNotificationSettings from "./push-notification-settings.screen";
import { connect } from "react-redux";
import { SwipeCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    token: state.user.token,
    settings: state.swipe.settings,
  };
}

const mapDispatchToProps = {
  loadSettings: SwipeCreators.requestGetSettings,
  updateSettings: SwipeCreators.requestSetSettings,
};

export default connect(mapStateToProps, mapDispatchToProps)(PushNotificationSettings);

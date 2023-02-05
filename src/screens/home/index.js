import Home from "./home";
import { connect } from "react-redux";
import { LiveCreators, InboxCreators, UserCreators, AppCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    token: state.user.token,
    user: state.user.user,
    streamStatus: state.live.streamStatus,
    isScrolling: state.live.isScrolling,
    notification: state.user.notification,
    visiblePurchase: state.app.visiblePurchase,
    visiblePluzo: state.app.visiblePluzo,
    modalShowed: state.app.modalShowed,
  };
}

const mapDispatchToProps = {
  setStreamStatus: LiveCreators.setStreamStatus,
  updateMessages: LiveCreators.updateMessages,
  loadPendingRequests: InboxCreators.requestPendingFriends,
  acceptFriendRequest: InboxCreators.requestAcceptFriend,
  rejectFriendRequest: InboxCreators.requestRejectFriend,
  updateNotification: UserCreators.updateNotification,
  initLiveUsers: LiveCreators.streamUserListSuccess,
  updateChannelName: LiveCreators.updateChannelName,
  showPurchase: AppCreators.showPurchase,
  showPluzo: AppCreators.showPluzo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

import StreamUsers from "./stream-users";
import { withSafeAreaInsets } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { LiveCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    broadcasters: state.live.broadcasters,
    audiences: state.live.audiences,
    stream: state.live.stream,
    token: state.user.token,
    user: state.user.user,
  };
}

const mapDispatchToProps = {
  requestStreamAskJoin: LiveCreators.requestStreamAskJoin,
  requestStreamDisconnectBroad: LiveCreators.requestStreamDisconnectBroad,
  updateAudiences: LiveCreators.updateAudiences,
  updateStream: LiveCreators.requestStreamUpdate,
  streamUpdateSuccess: LiveCreators.streamUpdateSuccess,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withSafeAreaInsets(StreamUsers));

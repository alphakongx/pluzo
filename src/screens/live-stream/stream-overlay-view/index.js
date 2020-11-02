import StreamOverlayView from "./stream-overlay-view";
import { LiveCreators } from "@redux/actions";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    user: state.user.user,
    streamStatus: state.live.streamStatus,
    broadcasters: state.live.broadcasters,
    audiences: state.live.audiences,
  };
}

const mapDispatchToProps = {
  setStreamStatus: LiveCreators.setStreamStatus,
  setIsScrolling: LiveCreators.setIsScrolling,
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamOverlayView);

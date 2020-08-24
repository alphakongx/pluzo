import Home from "./home";
import { connect } from "react-redux";
import { LiveCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    token: state.user.token,
    streamStatus: state.live.streamStatus,
    isScrolling: state.live.isScrolling,
  };
}

const mapDispatchToProps = {
  setStreamStatus: LiveCreators.setStreamStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

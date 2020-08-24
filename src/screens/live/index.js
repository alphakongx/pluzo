import Live from "./live.screen";
import { connect } from "react-redux";
import { LiveCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    token: state.user.token,
    user: state.user.user,
    allStreams: state.live.allStreams,
  };
}

const mapDispatchToProps = {
  requestStreamList: LiveCreators.requestStreamList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Live);

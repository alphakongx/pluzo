import StreamPlayer from "./stream-player";
import { connect } from "react-redux";
import { LiveCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    token: state.user.token,
    user: state.user.user,
  };
}

const mapDispatchToProps = {
  streamStop: LiveCreators.requestStreamStop,
  streamUserList: LiveCreators.requestStreamUserList,
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamPlayer);

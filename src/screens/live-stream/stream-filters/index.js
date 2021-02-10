import StreamFilters from "./stream-filters";
import { LiveCreators } from "@redux/actions";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    maskMode: state.live.maskMode,
  };
}

const mapDispatchToProps = {
  setMaskMode: LiveCreators.setMaskMode,
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamFilters);

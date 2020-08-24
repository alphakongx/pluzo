import LiveFilterSetting from "./live-filter-setting";
import { connect } from "react-redux";
import { LiveCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    sortBy: state.live.sortBy,
    filterCountry: state.live.filterCountry,
  };
}

const mapDispatchToProps = {
  setSortBy: LiveCreators.setSortBy,
  setFilterCountry: LiveCreators.setFilterCountry,
};

export default connect(mapStateToProps, mapDispatchToProps)(LiveFilterSetting);

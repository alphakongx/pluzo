import SearchScreen from "./search.screen";
import { connect } from "react-redux";
import { SearchCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    isSearching: state.search.isSearching,
    friends: state.search.friends,
    chat: state.search.chat,
    people: state.search.people,
    live: state.search.live,
    token: state.user.token,
  };
}

const mapDispatchToProps = {
  initSearch: SearchCreators.initializeSearch,
  search: SearchCreators.requestSearch,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);

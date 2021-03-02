import NoUsers from "./no-users";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    user: state.user.user,
    isLoadingCards: state.swipe.isLoadingCards,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NoUsers);

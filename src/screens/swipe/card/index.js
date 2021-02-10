import Card from "./card";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    showAnimation: state.swipe.showSwipeTutorial,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Card);

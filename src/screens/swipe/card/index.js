import Card from "./card";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    imageIndex: state.swipe.cardImageIndex,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Card);

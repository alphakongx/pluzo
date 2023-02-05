import React from "react";
import { requireNativeComponent } from "react-native";

const RCTPluzoArView = requireNativeComponent("RCTPluzoArView", PluzoArView, {});

class PluzoArView extends React.Component {
  render() {
    return <RCTPluzoArView {...this.props} />;
  }
}
export default PluzoArView;

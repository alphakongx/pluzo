import React, { PureComponent } from 'react';
import ReactNative, { 
  requireNativeComponent, 
  UIManager, 
  Platform,
  View,
} from 'react-native';

// const RCTPluzoArView = requireNativeComponent('RCTPluzoArView', PluzoArView, {});
const RNTDeepARView = requireNativeComponent("RNTDeepArView", PluzoArView);

var RNT_DEEPARVIEW_REF = 'deeparview';
class PluzoArView extends React.Component {

  render() {
    var onEventSent = (event) => {
      const onEventSentCallback = this.props.onEventSent;

      if(onEventSentCallback) {
        onEventSentCallback(event.nativeEvent);
      }
    }

    let {...props} = {...this.props};
    delete props.onEventSent;

    return (
      <RNTDeepARView 
        ref={RNT_DEEPARVIEW_REF} 
        {...this.props} 
        onEventSent={onEventSent}/>
    )
  }
  /**componentDidMount() {
    if (Platform.OS === "ios") {
      this.setupTimer = setTimeout(() => {
        UIManager.dispatchViewManagerCommand(
          ReactNative.findNodeHandle(this.myPluzoArView),
          UIManager.RCTPluzoArView.Commands.setupDataViaManager,
          [this._viewWidth, this._viewHeight]
        );
      }, 2000);
    }
  }

  componentWillUnmount() {
    console.log("Unmounted");
    if (Platform.OS === "ios") {
      clearTimeout(this.setupTimer);
      UIManager.dispatchViewManagerCommand(
        ReactNative.findNodeHandle(this.myPluzoArView),
        UIManager.RCTPluzoArView.Commands.cleanDataViaManager,
        []
      );
    }
  }

  render() {
    return (
      <View style={{flex: 1}}
        onLayout={(e) => {
          this._viewWidth = e.nativeEvent.layout.width;
          this._viewHeight = e.nativeEvent.layout.height;
        }}>
        <RCTPluzoArView {...this.props}
          ref={(component) => this.myPluzoArView = component } />
      </View>
    )
  }*/
}
export default PluzoArView;
import React from "react";
import { View } from "react-native";
import { Touchable, Image } from "@components";
import Modal from "react-native-modal";
import PhotoView from "react-native-photo-view";
import Images from "@assets/Images";

import styles from "./zoom-image-modal.style";

class ZoomImageModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.zoomImage);
    return (
      <Modal
        {...this.props}
        customBackdrop={
          <Touchable style={styles.flexFill} onPress={this.props.onSwipeComplete}>
            <View style={[styles.flexFill, styles.darkView]} />
          </Touchable>
        }
        backdropOpacity={1}
        animationIn={"zoomIn"}
        animationOut={"zoomOut"}
        swipeDirection={["down", "up"]}
        swipeThreshold={100}
        useNativeDriver={false}
        propagateSwipe={false}
        style={styles.container}
      >
        <View style={styles.flexFill} pointerEvents={"box-none"}>
          <PhotoView source={{ uri: this.props.zoomImage }} style={styles.image} />
          <Touchable
            style={[styles.closeButton, { top: this.props.insets.top + 15 }]}
            onPress={this.props.onSwipeComplete}
          >
            <Image source={Images.app.icCross} style={styles.closeImage} />
          </Touchable>
        </View>
      </Modal>
    );
  }
}

export default ZoomImageModal;

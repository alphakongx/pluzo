import React from "react";
import { View, ImageBackground } from "react-native";
import { GradientButton, Text, BackButton } from "@components";
import Modal from "react-native-modal";
import { BlurView } from "@react-native-community/blur";
import { GRADIENT } from "@config";
import Images from "@assets/Images";
import styles from "./purchase-modal.style";

class PurchaseModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        {...this.props}
        customBackdrop={
          <BlurView
            style={styles.flexFill}
            blurType='dark'
            blurAmount={18}
            reducedTransparencyFallbackColor='white'
          />
        }
        backdropOpacity={1}
        swipeDirection={"down"}
        swipeThreshold={100}
        useNativeDriver={false}
        propagateSwipe={false}
      >
        <View style={styles.container}>
          <ImageBackground
            source={Images.app.purchaseBg}
            style={styles.imageBackground}
            resizeMode='contain'
          >
            <BackButton onPress={this.props.onSwipeComplete} />

            <Text style={styles.priceText}>For $4.99/month</Text>
          </ImageBackground>
          <View style={styles.buttonContainer}>
            <GradientButton
              text={"Purchase"}
              colors={GRADIENT.PURCHASE_BUTTON}
              onPress={this.props.onSwipeComplete}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

export default PurchaseModal;

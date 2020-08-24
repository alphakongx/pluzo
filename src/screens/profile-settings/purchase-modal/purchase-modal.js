import React from "react";
import { View, ImageBackground } from "react-native";
import { GradientButton, Text, BackButton, BoxShadow, Touchable } from "@components";
import Modal from "react-native-modal";
import { BlurView } from "@react-native-community/blur";
import { GRADIENT } from "@config";
import Images from "@assets/Images";
import styles, { screenWidth } from "./purchase-modal.style";

class PurchaseModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        {...this.props}
        customBackdrop={
          <Touchable style={styles.flexFill} onPress={this.props.onSwipeComplete}>
            <BlurView
              style={styles.flexFill}
              blurType='dark'
              blurAmount={18}
              reducedTransparencyFallbackColor='white'
            />
          </Touchable>
        }
        backdropOpacity={1}
        swipeDirection={"down"}
        swipeThreshold={100}
        useNativeDriver={false}
        propagateSwipe={false}
      >
        <View style={styles.container}>
          <View>
            <BoxShadow
              setting={{
                width: screenWidth - 40,
                height: ((screenWidth - 40) * 480) / 335,
                color: "#FF0000",
                opacity: 0.15,
                _borderRadius: 15,
                spread: 0,
                blur: 30,
                offsetX: 0,
                offsetY: 0,
              }}
            />
            <ImageBackground
              source={Images.app.purchaseBg}
              style={styles.imageBackground}
              resizeMode={"stretch"}
            >
              <BackButton onPress={this.props.onSwipeComplete} />

              <Text style={styles.priceText}>For $4.99/month</Text>
            </ImageBackground>
          </View>
          <View style={styles.buttonContainer}>
            <GradientButton
              text={"Purchase"}
              colors={GRADIENT.PURCHASE_BUTTON}
              shadowColor={"#FF6F00"}
              onPress={this.props.onSwipeComplete}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

export default PurchaseModal;

import React from "react";
import { View, ImageBackground } from "react-native";
import { GradientButton, Text, BackButton, BoxShadow, Touchable } from "@components";
import Modal from "react-native-modal";
import RNIap from "react-native-iap";
import { BlurView } from "@react-native-community/blur";
import { GRADIENT } from "@config";
import Images from "@assets/Images";
import { widthPercentageToDP as wp, ItemSkus } from "@helpers";
import styles, { screenWidth } from "./purchase-modal.style";

class PurchaseModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  onPurchase = async sku => {
    try {
      await RNIap.requestSubscription(sku);
    } catch (err) {
      console.log(err.code, err.message);
    }
  };

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
                width: screenWidth - wp(40),
                height: ((screenWidth - wp(40)) * 480) / 335,
                color: "#FF0000",
                opacity: 0.15,
                _borderRadius: wp(15),
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

              <Text style={styles.priceText}>For $9.99/month</Text>
            </ImageBackground>
          </View>
          <View style={styles.buttonContainer}>
            <GradientButton
              text={"Purchase"}
              colors={GRADIENT.PURCHASE_BUTTON}
              shadowColor={"#FF6F00"}
              onPress={() => this.onPurchase(ItemSkus[0])}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

export default PurchaseModal;

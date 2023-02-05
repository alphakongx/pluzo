import React from "react";
import { View } from "react-native";
import FastImage from "react-native-fast-image";
import {
  GradientButton,
  Text,
  BoxShadow,
  Touchable,
  Image,
  ModalBase as Modal,
} from "@components";
import { BlurView } from "@react-native-community/blur";
import * as Animatable from "react-native-animatable";
import RNIap from "react-native-iap";
import { GRADIENT } from "@config";
import Images from "@assets/Images";

import styles, { screenWidth } from "./pluzo-learn-modal.style";

const { createAnimatableComponent } = Animatable;
const AnimatableView = createAnimatableComponent(View);

const plusAnimation = {
  from: {
    ["translateY"]: -20,
  },
  to: {
    ["translateY"]: 0,
  },
};

class PurchaseModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      visibleSelect: false,
      visibleAdvantage: false,
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
    let totalMonth = 0;
    if (this.props.user.premium === 1) {
      totalMonth = this.props.user.premium_info.total_month;
    }

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
        propagateSwipe={true}
        onModalWillShow={() => this.setState({ visibleAdvantage: false })}
      >
        <View style={styles.container}>
          {this.props.pluzoType === "swipe" && (
            <Text style={styles.questionText}>
              {"Want to see who likes your profile?"}
            </Text>
          )}
          {this.props.pluzoType === "opened" && (
            <Text style={styles.questionText}>{"Unlock exclusive badges and more!"}</Text>
          )}

          <View>
            <BoxShadow
              setting={{
                width: screenWidth - 40,
                height: ((screenWidth - 40) * 169) / 336,
                color: "#FF0000",
                opacity: 0.15,
                _borderRadius: 22,
                spread: 0,
                blur: 40,
                offsetX: 0,
                offsetY: 0,
              }}
            />
            <View style={styles.premiumView}>
              <FastImage
                source={Images.app.pluzoplusMask1}
                style={styles.premiumMask1}
                resizeMode={FastImage.resizeMode.cover}
              />
              <FastImage
                source={Images.app.pluzoplusMask2}
                style={styles.premiumMask2}
                resizeMode={FastImage.resizeMode.cover}
              />
              <FastImage
                source={Images.app.pluzoplusLogo}
                style={
                  this.props.user.premium === 1
                    ? styles.premiumLogoCenter
                    : styles.premiumLogo
                }
              />
              {this.props.user.premium === 0 && (
                <Text style={styles.premiumText}>
                  {"Exclusive features to enhance\nyour experience."}
                </Text>
              )}
              <AnimatableView
                style={styles.premiumPlusView}
                animation={plusAnimation}
                iterationCount={"infinite"}
                direction='alternate'
                duration={4000}
              >
                <Image
                  source={Images.app.pluzoplusPlus}
                  style={styles.premiumPlusImage}
                />
              </AnimatableView>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <GradientButton
              text={"Learn more"}
              colors={GRADIENT.PURCHASE_BUTTON}
              shadowColor={"#FF6F00"}
              onPress={() => this.props.onShowPurchase()}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

export default PurchaseModal;

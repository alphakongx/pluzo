import React, { useState } from "react";
import { View } from "react-native";
import {
  Text,
  Image,
  BlurView,
  BoxShadow,
  Touchable,
  SolidButton,
  GradientButton,
} from "@components";
import Modal from "react-native-modal";
import RNIap from "react-native-iap";
import * as Animatable from "react-native-animatable";
import LinearGradient from "react-native-linear-gradient";
import { ItemSkus } from "@helpers";
import PriceBoxView from "../price-box-view";
import Images from "@assets/Images";
import PurchaseModal from "../../profile-settings/purchase-modal";

import styles from "./swipe-purchase-modal.style";

const { createAnimatableComponent } = Animatable;
const AnimatableView = createAnimatableComponent(View);

const SwipePurchaseModal: () => React$Node = props => {
  const [boost, setBoost] = useState(1);
  const [boxWidth, setBoxWidth] = useState(1);
  const [boxHeight, setBoxHeight] = useState(1);
  const [visiblePurchase, setVisiblePurchase] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const boxShadowOpt = {
    width: boxWidth,
    height: boxHeight,
    color: "#FF0000",
    opacity: 0.15,
    _borderRadius: 22,
    spread: 0,
    blur: 40,
    offsetX: 0,
    offsetY: 0,
  };

  const onPurchase = async () => {
    try {
      setPurchasing(true);
      if (props.purchaseType === "boost") {
        await RNIap.requestPurchase(ItemSkus[boost]);
      } else if (props.purchaseType === "superlike") {
        await RNIap.requestPurchase(ItemSkus[boost + 3], false);
      } else {
        await RNIap.requestPurchase(ItemSkus[boost + 6]);
      }
      setPurchasing(false);
      props.onHide();
    } catch (err) {
      setPurchasing(false);
      console.log(err.code, err.message);
    }
  };

  return (
    <Modal
      isVisible={props.isVisible}
      backdropOpacity={1}
      customBackdrop={
        <Touchable style={styles.flexFill} onPress={props.onHide}>
          <BlurView />
        </Touchable>
      }
      animationIn={"zoomIn"}
      animationOut={"zoomOut"}
      backdropTransitionInTiming={0}
      backdropTransitionOutTiming={0}
      useNativeDriver={false}
      propagateSwipe={true}
      swipeDirection={"down"}
      onSwipeComplete={props.onHide}
      onModalWillShow={() => setPurchasing(false)}
    >
      <View style={styles.container}>
        <BoxShadow setting={boxShadowOpt} />
        <LinearGradient
          colors={props.colors}
          locations={[0, 0.65, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.boxContainer}
          onLayout={e => {
            setBoxWidth(e.nativeEvent.layout.width);
            setBoxHeight(e.nativeEvent.layout.height);
          }}
        >
          <View style={styles.boxContentContainer}>
            {props.uptoLogo && (
              <AnimatableView
                animation={{
                  from: {
                    ["translateY"]: -5,
                  },
                  to: {
                    ["translateY"]: 5,
                  },
                }}
                iterationCount={"infinite"}
                direction="alternate"
                duration={3000}>
                <Image
                  source={Images.swipe.boostTextLogo}
                  style={styles.uptoLogo}
                  pointerEvents={"none"}
                />
              </AnimatableView>
            )}
            <View style={styles.logoContainer}>
              <AnimatableView
                animation={{
                  from: {
                    ["translateY"]: -5,
                  },
                  to: {
                    ["translateY"]: 5,
                  },
                }}
                iterationCount={"infinite"}
                direction="alternate"
                duration={2000}>
                <Image
                  source={props.mainLogo}
                  style={styles.mainLogo}
                  pointerEvents={"none"}
                />
              </AnimatableView>
              <Image
                source={props.mainLogoCenter}
                style={styles.mainLogoCenter}
                pointerEvents={"none"}
              />
            </View>
            <Text style={styles.titleText} pointerEvents={"none"}>
              Out of {props.text}s!
            </Text>
            <Text style={styles.subText} pointerEvents={"none"}>
              28 days until your next free {props.text}.
            </Text>

            <View style={styles.pricesContainer}>
              <PriceBoxView
                count={1}
                boxTitle={props.text}
                selected={boost === 1}
                onSelect={() => setBoost(1)}
                selectColors={props.selectColors}
                price={"6.99"}
              />
              <PriceBoxView
                count={5}
                boxTitle={`${props.text}s`}
                saveValue={14}
                selected={boost === 2}
                onSelect={() => setBoost(2)}
                selectColors={props.selectColors}
                price={"6.00"}
              />
              <PriceBoxView
                count={10}
                boxTitle={`${props.text}s`}
                saveValue={28}
                selected={boost === 3}
                onSelect={() => setBoost(3)}
                selectColors={props.selectColors}
                price={"5.00"}
              />
            </View>

            <View style={styles.buttonContainer}>
              <SolidButton
                text={props.confirmText}
                loading={purchasing}
                loadingColor={"black"}
                disabled={purchasing}
                onPress={() => {
                  onPurchase();
                  // props.onConfirm(boost);
                }}
              />
            </View>
            <Text style={styles.orText}>OR</Text>
            <View style={styles.buttonContainer}>
              <GradientButton
                colors={["#FF7131", "#E0E552"]}
                shadowColor={"#FF6F00"}
                text={"Get Pluzo Plus"}
                onPress={() => setVisiblePurchase(true)}
              />
              <AnimatableView
                animation={{
                  from: {
                    ["translateY"]: -2.5,
                  },
                  to: {
                    ["translateY"]: 2.5,
                  },
                }}
                iterationCount={"infinite"}
                direction="alternate"
                duration={1500}
                style={styles.plusMark}
                pointerEvents={"box-none"}>
                <Image
                  source={Images.swipe.pluzoPlusMark}
                  pointerEvents={"none"}
                  style={styles.plusImage}
                />
              </AnimatableView>
            </View>
          </View>
        </LinearGradient>
        <PurchaseModal
          isVisible={visiblePurchase}
          onSwipeComplete={() => setVisiblePurchase(false)}
        />
      </View>
    </Modal>
  );
};

SwipePurchaseModal.defaultProps = {
  colors: ["#0C0518", "#1F0847", "#7500BF"],
  selectColors: ["#D491FF", "#8F00E9"],
  uptoLogo: false,
  mainLogo: Images.swipe.boostLogo,
  mainLogoCenter: Images.swipe.boostLogoCenter,
  text: "Boost",
  confirmText: "Boost me",
};

export default SwipePurchaseModal;

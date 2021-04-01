import React from "react";
import { View } from "react-native";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";
import { GradientButton, Text, BackButton, BoxShadow, Touchable, Screen, ModalBase as Modal } from "@components";
import { BlurView } from "@react-native-community/blur";
import * as Animatable from "react-native-animatable";
import Images from "@assets/Images";
import { widthPercentageToDP as wp } from "@helpers";

import styles, { screenWidth } from "./puchase-select-modal.style";

const { createAnimatableComponent } = Animatable;
const AnimatableView = createAnimatableComponent(View);

const shadowOptions = {
  width: screenWidth - wp(40),
  height: ((screenWidth - wp(40)) * 375) / 335,
  color: "#FF0000",
  opacity: 0.15,
  _borderRadius: wp(15),
  spread: 0,
  blur: 30,
  offsetX: 0,
  offsetY: 0,
};
const shadowItemOptions = {
  width: wp(95),
  height: wp(140),
  color: "#FF7131",
  opacity: 0.52,
  _borderRadius: wp(15),
  spread: 0,
  blur: 10,
  offsetX: 0,
  offsetY: 0,
};
const maskAnimation = {
  from: {
    ["translateY"]: 0,
  },
  to: {
    ["translateY"]: -30,
  },
};

class PurchaseSelectModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      activePeriod: 1,
      periods: [
        { period: "1 month", price: "$11.99", fullprice: "$11.99", saving: "", numberOfPeriod: 1 },
        { period: "3 months", price: "$9.99", fullprice: "$29.99", saving: "Save 14%", numberOfPeriod: 3 },
        { period: "1 year", price: "$7.99", fullprice: "$95.99", saving: "Save 28%", numberOfPeriod: 12 }
      ]
    };
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
              setting={shadowOptions}
            />
            <LinearGradient
              colors={["#1A023E", "#0C0518", "#110029"]}
              locations={[0, 0.65, 1]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.mainBackground}>
              <AnimatableView
                style={styles.maskContainer}
                animation={maskAnimation}
                iterationCount={"infinite"}
                direction="alternate"
                duration={8000}>
                <FastImage source={Images.app.pluzoplusMask} style={styles.pluzoplusMask} />
              </AnimatableView>

              <BackButton onPress={this.props.onSwipeComplete} />
              <View style={styles.contentContainer} pointerEvents={"box-none"}>
                <View style={styles.logoContainer} pointerEvents={"box-none"}>
                  <FastImage source={Images.app.pluzoplusLogo} style={styles.pluzoplusLogo} />
                  <Text style={styles.descText}>Exclusive features to enhance{"\n"}your experience.</Text>
                </View>

                <View style={styles.detailContainer}>
                  {[0, 1, 2].map((value) => {
                    let disabled = this.state.activePeriod !== value;
                    let buttonText = "Select";
                    if (this.props.purchasedMonths > 0) {
                      if (this.props.purchasedMonths === this.state.periods[value].numberOfPeriod) {
                        buttonText = "Purchased";
                      } else {
                        buttonText = "Change";
                      }
                    }
                    return (
                      <View style={styles.itemContainer} key={`select-period-${value}`}>
                        <BoxShadow
                          setting={shadowItemOptions}
                        />
                        <Touchable onPress={() => {
                          if (disabled) {
                            this.setState({ activePeriod: value });
                          } else {
                            if (buttonText !== "Purchased") {
                              this.props.onConfirm(this.state.activePeriod);
                            }
                          }
                        }} activeOpacity={1}>
                          <Screen hasGradient style={[styles.itemContentContainer, !disabled && styles.itemActive]}>
                            <Text style={[styles.itemPeriodText, !disabled && { color: "#FF7131" }]}>{this.state.periods[value].period}</Text>
                            <Text style={styles.itemPopularText}>{value == 1 ? "Most Popular" : ""}</Text>
                            <Text style={styles.itemSaveText}>{this.state.periods[value].saving}</Text>
                            <Text style={styles.itemPriceText}>{this.state.periods[value].fullprice}</Text>
                            <View style={{ flex: 1 }} />
                            <Text style={styles.itemFullPriceText}>
                              {this.state.periods[value].price}
                            </Text>
                            <Text style={styles.itemUnitText}>a month</Text>
                          </Screen>
                        </Touchable>
                        <GradientButton
                          text={buttonText}
                          textStyle={[styles.selectButtonText, !disabled && styles.itemActiveText]}
                          containerStyle={[styles.selectButton]}
                          colors={disabled ? ["#0B0516", "#1A023E"] : ["#FF7131", "#E0E552"]}
                          shadowColor={"#FF6F00"}
                          disabledButton={false}
                          onPress={() => {
                            if (disabled) {
                              this.setState({ activePeriod: value });
                            } else {
                              if (buttonText !== "Purchased") {
                                this.props.onConfirm(this.state.activePeriod);
                              }
                            }
                          }} />
                      </View>
                    )
                  })}
                </View>
              </View>

            </LinearGradient>
          </View>
          <View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>Recurring billing, cancel anytime.</Text>
              <Text style={styles.descriptionContent}>
                By tapping Select, your payment will be charged to your iTunes account, and your subscription will automatically renew for the same package length at the same price until you cancel in settings in the iTunes Store at least 24 hours perior to the end of the current period. By tapping Select, you agree to our Privacy Policy and Terms.
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default PurchaseSelectModal;

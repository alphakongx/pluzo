import React, { useState } from "react";
import { View } from "react-native";
import { Screen, BackButton, Text, Image, BoxShadow, GradientButton } from "@components";
import Modal from "react-native-modal";
import Images from "@assets/Images";

import styles from "./confirm-delete-modal.style";

const ConfirmDeleteModal: () => React$Node = props => {
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);
  let backShadowOpt = {
    width: width,
    height: height,
    color: "#0B0516",
    opacity: 0.5,
    _borderRadius: 20,
    spread: 0,
    blur: 20,
    offsetX: 0,
    offsetY: 6,
  };

  const title = "Are you sure?";
  const message = "Do you really want to remove that friend?";
  const buttonText = "Remove friend";

  const onConfirm = () => {
    const { token } = props;
    props.onConfirm(props.userId, props.userName);
  };

  return (
    <Modal
      {...props}
      onBackdropPress={props.onBack}
      backdropOpacity={0.5}
      useNativeDriver={false}
      style={styles.modalContainer}
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
      swipeDirection={"down"}
      onSwipeComplete={props.onBack}
    >
      <View
        onLayout={e => {
          setWidth(e.nativeEvent.layout.width);
          setHeight(e.nativeEvent.layout.height);
        }}
      >
        <BoxShadow setting={backShadowOpt} />
        <Screen hasGradient style={styles.modalContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.messageText} numberOfLines={2}>
            {message}
          </Text>
          <View style={styles.buttonContainer}>
            <GradientButton 
              colors={["#FF0036", "#FF0036"]}
              noShadow
              onPress={() => onConfirm()} text={buttonText} />
          </View>
        </Screen>
        <View style={styles.logoContainer}>
          <View style={styles.logoIconContainer}>
            <Image source={Images.app.icCross} style={styles.logoIcon} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmDeleteModal;

import React from "react";
import { View } from "react-native";
import { ModalHeader, GradientButton, SolidButton, Screen, Touchable, Text } from "@components";
import { BlurView } from "@react-native-community/blur";
import Modal from "react-native-modal";

import styles from "./gender-modal.style";

const GenderModal: () => React$Node = props => {
  const onChangeGender = value => {
    props.onChange && props.onChange(value);
  };

  return (
    <Modal
      {...props}
      customBackdrop={
        <Touchable style={styles.flexFill} onPress={() => props.onDismiss()}>
          {props.tutorial ? (
            <View style={styles.backdrop} />
          ) : (
            <BlurView
              style={styles.flexFill}
              blurType='dark'
              blurAmount={10}
              reducedTransparencyFallbackColor='#0B0516'
            />
          )}
        </Touchable>
      }
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
      backdropTransitionOutTiming={0}
      backdropOpacity={1}
      useNativeDriver={false}
      propagateSwipe={true}
      swipeDirection={props.tutorial ? [] : ["down"]}
      onSwipeComplete={() => props.onDismiss()}
    >
      <Screen 
        hasGradient={!props.tutorial}
        containerStyle={{overflow: "hidden"}}
        style={styles.container}
        noFill>
        {!props.tutorial &&<ModalHeader title={"Show me"} onDismiss={props.onDismiss} />}
        {props.tutorial &&
        <Text style={styles.tutorialTitle}>{"Who do you\nwant to meet?"}</Text>}
        
        {!props.tutorial && <View style={styles.spacer} />}

        <View style={styles.buttonContainer}>
          {props.gender === 1 ? (
            <GradientButton onPress={() => onChangeGender(1)} text={"Male"} />
          ) : (
            <SolidButton onPress={() => onChangeGender(1)} text={"Male"} />
          )}
        </View>

        <View style={styles.buttonContainer}>
          {props.gender === 2 ? (
            <GradientButton onPress={() => onChangeGender(2)} text={"Female"} />
          ) : (
            <SolidButton onPress={() => onChangeGender(2)} text={"Female"} />
          )}
        </View>

        <View style={styles.buttonContainer}>
          {props.gender === 0 ? (
            <GradientButton onPress={() => onChangeGender(0)} text={"Everyone"} />
          ) : (
            <SolidButton onPress={() => onChangeGender(0)} text={"Everyone"} />
          )}
        </View>
        {!props.tutorial && <View style={styles.spacer} />}
        <View style={styles.spacer} />
      </Screen>
    </Modal>
  );
};

export default GenderModal;

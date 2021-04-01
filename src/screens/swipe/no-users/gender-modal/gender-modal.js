import React from "react";
import { View } from "react-native";
import { ModalHeader, GradientButton, SolidButton, Screen, Touchable, Text, ModalBase as Modal } from "@components";
import { BlurView } from "@react-native-community/blur";

import styles from "./gender-modal.style";

const GenderModal: () => React$Node = props => {
  const { onChange, onDismiss, gender, tutorial, ...rest } = props;
  const onChangeGender = value => {
    onChange && onChange(value);
  };

  return (
    <Modal
      {...rest}
      customBackdrop={
        <Touchable style={styles.flexFill} onPress={() => onDismiss()}>
          {tutorial ? (
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
      swipeDirection={tutorial ? [] : ["down"]}
      onSwipeComplete={() => onDismiss()}
    >
      <Screen 
        hasGradient={!tutorial}
        containerStyle={{overflow: "hidden"}}
        style={styles.container}
        noFill>
        {!tutorial &&<ModalHeader title={"Show me"} onDismiss={onDismiss} />}
        {tutorial &&
        <Text style={styles.tutorialTitle}>{"Who do you\nwant to meet?"}</Text>}
        
        {!tutorial && <View style={styles.spacer} />}

        <View style={styles.buttonContainer}>
          {gender === 1 ? (
            <GradientButton onPress={() => onChangeGender(1)} text={"Male"} />
          ) : (
            <SolidButton onPress={() => onChangeGender(1)} text={"Male"} />
          )}
        </View>

        <View style={styles.buttonContainer}>
          {gender === 2 ? (
            <GradientButton onPress={() => onChangeGender(2)} text={"Female"} />
          ) : (
            <SolidButton onPress={() => onChangeGender(2)} text={"Female"} />
          )}
        </View>

        <View style={styles.buttonContainer}>
          {gender === 0 ? (
            <GradientButton onPress={() => onChangeGender(0)} text={"Everyone"} />
          ) : (
            <SolidButton onPress={() => onChangeGender(0)} text={"Everyone"} />
          )}
        </View>
        {!tutorial && <View style={styles.spacer} />}
        <View style={styles.spacer} />
      </Screen>
    </Modal>
  );
};

export default GenderModal;

import React, { Component } from "react";
import { View, TextInput, Platform, ScrollView, SafeAreaView } from "react-native";
import { BlurView } from "@react-native-community/blur";
import KeyboardManager from "react-native-keyboard-manager";
import LinearGradient from "react-native-linear-gradient";
import Modal from "react-native-modal";
import { Touchable, Image, Text } from "@components";

import { GRADIENT } from "@config";
import Images from "@assets/Images";
import styles from "./report-modal.style";

class ReportModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeButtons: [
        {id: 1, select: false, text: "Harassment"},
        {id: 2, select: false, text: "Nudity"},
        {id: 3, select: false, text: "I don't like it"},
        {id: 4, select: false, text: "Propaganda"},
        {id: 5, select: false, text: "Other"},
      ]
    }
  }

  onModalShow = () => {
    if (Platform.OS === "ios") {
      KeyboardManager.setEnable(true);
    }
  }

  onModalHide = () => {
    if (Platform.OS === "ios" && this.props.keyboardDisable) {
      KeyboardManager.setEnable(false);
    }
  }

  onReport = () => {
    this.props.onDismiss && this.props.onDismiss();
  }

  onTypeSelect = (typeId) => {
    const { typeButtons } = this.state;
    typeButtons.forEach((button) => {
      if (button.id === typeId) {
        button.select = true;
      } else {
        button.select = false;
      }
    });
    this.setState({typeButtons});
  }

  renderTypeButtons = () => {
    const { typeButtons } = this.state;
    return typeButtons.map((button) => {
      return (
        <Touchable
          key={`type-buttons-${button.id}`}
          style={[styles.typeButton, button.select ? styles.typeButtonSelect : {}]}
          onPress={() => this.onTypeSelect(button.id)}>
          <Text style={styles.typeButtonText}>{button.text}</Text>
        </Touchable>
      )
    })
  }

  render() {
    return (
      <Modal
        {...this.props}
        customBackdrop={
          <BlurView
            style={styles.flexFill}
            blurType='dark'
            blurAmount={10}
            reducedTransparencyFallbackColor='#0B0516'
          />
        }
        backdropTransitionOutTiming={0}
        backdropTransitionInTiming={0}
        backdropOpacity={1}
        useNativeDriver={false}
        propagateSwipe={true}
        onModalShow={this.onModalShow}
        onModalWillHide={this.onModalHide}
        style={styles.modalContainer}
      >
        <View style={styles.container}>
          <Touchable style={styles.backButton}
            onPress={() => {
              this.props.onDismiss && this.props.onDismiss();
            }}>
            <Image source={Images.app.icBack} style={styles.backImage} />
          </Touchable>
          <LinearGradient
            colors={GRADIENT.SCREEN_BACKGROUND}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            <SafeAreaView style={styles.contentContainer}>
              <ScrollView style={styles.scrollView}>
                <Text style={styles.titleText}>Report</Text>
                <Text style={styles.descriptionText}>Tell us why you want to report this livestream</Text>

                {
                  this.renderTypeButtons()
                }

                <TextInput 
                  multiline={true}
                  placeholderTextColor={"#ABA7D5"}
                  placeholder={"Here you can add additional information..."}
                  style={styles.reportContentText} 
                />
                <Touchable style={[styles.reportButton]}
                  onPress={this.onReport}>
                  <Text style={styles.reportButtonText}>Report</Text>
                </Touchable>
              </ScrollView>
            </SafeAreaView>
            
          </LinearGradient>
        </View>
      </Modal>
    );
  }
}

export default ReportModal;

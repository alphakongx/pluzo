import React, { Component } from "react";
import { View, SafeAreaView } from "react-native";
import { BlurView } from "@react-native-community/blur";
import Modal from "react-native-modal";
import { Touchable, Text } from "@components";
import { AppTags } from "@config";
import LinearGradient from "react-native-linear-gradient";

import styles from "./stream-cateogry-modal.style";
import StreamEmojiView from "../stream-emoji-view";
import EventBus from "eventing-bus";

class StreamCategoryModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: parseInt(this.props.stream.category, 10) > 6 ? 0 : parseInt(this.props.stream.category, 10),
    };
  }

  componentDidMount() {
    this._closeAction = EventBus.on("Modal_Close", () => {
      this.props.onDismiss && this.props.onDismiss();
    });
  }

  componentWillUnmount() {
    this._closeAction();
  }

  onModalHide = () => {
    this.props.updateStream(this.props.stream, this.props.token);
  };

  onChangeEmoji = item => {
    let stream = this.props.stream;
    stream.category = item.id;
    this.props.streamUpdateSuccess(stream);
    this.setState({ category: item.id });
  };

  render() {
    return (
      <Modal
        {...this.props}
        customBackdrop={
          <Touchable
            style={styles.flexFill}
            onPress={() => {
              this.props.onDismiss && this.props.onDismiss();
            }}
          >
            <BlurView
              style={styles.flexFill}
              blurType='dark'
              blurAmount={10}
              reducedTransparencyFallbackColor='#0B0516'
            />
          </Touchable>
        }
        backdropTransitionOutTiming={0}
        backdropTransitionInTiming={0}
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        backdropOpacity={1}
        useNativeDriver={false}
        propagateSwipe={true}
        swipeDirection={"down"}
        onSwipeComplete={this.props.onDismiss}
        onModalWillHide={this.onModalHide}
        style={styles.modalContainer}
      >
        <SafeAreaView style={styles.container} pointerEvents={"box-none"}>
          <View style={styles.emojiButtonContainer} pointerEvents={"box-none"}>
            <View style={styles.emojiButton} pointerEvents={"box-none"}>
              {this.state.category === 0 ?
              (
                <Text style={styles.emptyCategoryText}>Category</Text>
              ): (
              <LinearGradient
                colors={Object.values(AppTags[this.state.category].color)}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 1}}
                style={styles.emojiCategoryContainer}>
                <Text style={[styles.itemText, {textShadowColor: AppTags[this.state.category].shadowColor}]}>
                  {AppTags[this.state.category].name}
                </Text>
              </LinearGradient>
              )}
            </View>
          </View>
          <View style={styles.emojiContainer}>
            <StreamEmojiView onChangeEmoji={this.onChangeEmoji} />
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
}

export default StreamCategoryModal;

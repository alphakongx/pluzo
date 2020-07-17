import React, { Component } from "react";
import { View, Keyboard } from "react-native";
import { Text, BackButton, Touchable, GradientButton, TextInput } from "@components";
import { BlurView } from "@react-native-community/blur";
import LinearGradient from "react-native-linear-gradient";
import Modal from "react-native-modal";
import EventBus from "eventing-bus";
import { InboxTypes } from "@redux/actions";

import { GRADIENT } from "@config";
import { Notification } from "@helpers";
import Images from "@assets/Images";
import styles from "./add-friend-modal.style";

class AddFriendModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      requestSuccess: "none", // none, success, fail
    };
  }

  componentDidMount() {
    this.addSuccessAction = EventBus.on(
      InboxTypes.ADD_FRIEND_SUCCESS,
      this.onAddingSuccess,
    );
    this.addFailureAction = EventBus.on(
      InboxTypes.ADD_FRIEND_FAILURE,
      this.onAddingFailure,
    );
  }

  componentWillUnmount() {
    this.addSuccessAction();
    this.addFailureAction();
  }

  onAddingSuccess = () => {
    this.setState({requestSuccess: "success"});
  }

  onAddingFailure = () => {
    this.setState({requestSuccess: "fail"});
  }

  onBack = () => {
    this.setState({username: "", requestSuccess: "none"}, () => {
      this.props.dismissModal();
    });
  }

  onAddFriend = () => {
    const { username } = this.state;
    const { token } = this.props;

    if (username === "") {
      Notification.alert("Please enter the username");
      return;
    }
    Keyboard.dismiss();
    this.props.addFriend(username, token);
  }

  render() {

    const { username, requestSuccess } = this.state;
    const { isAddingFriend } = this.props;

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
        animationIn={"zoomIn"}
        animationOut={"zoomOut"}
        backdropTransitionOutTiming={0}
        backdropOpacity={1}
        useNativeDriver={false}
        propagateSwipe={true}
      >
        <LinearGradient
          colors={GRADIENT.SCREEN_BACKGROUND}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.container}
        >
          <View style={styles.headerContainer}>
            <BackButton 
              icon={Images.app.icBackLeft}
              onPress={this.onBack} />
            <Touchable onPress={this.props.pendingRequest}>
              <View style={styles.requestContainer}>
                <Text style={styles.requestText}>Pending Requests</Text>
              </View>
            </Touchable>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>Add a friend</Text>
            <Text style={styles.noteText}>
              Enter their username to add them{"\n"}to your friends.
            </Text>

            <View style={styles.inputContainer}>
              <TextInput
                value={username}
                onChangeText={value => this.setState({ username: value, requestSuccess: "none" })}
                placeholder={"Username"}
                autoCapitalize={"none"}
              />
            </View>
            <View style={styles.buttonContainer}>
              <GradientButton
                onPress={this.onAddFriend}
                loading={isAddingFriend}
                containerStyle={styles.addButton}
                textStyle={styles.addButtonText}
                text={"Add"}
              />
            </View>
            {requestSuccess === "success" && (
              <Text style={styles.successText}>Friend Request successful!</Text>
            )}
            {requestSuccess === "fail" && (
              <Text style={styles.failText}>User doesn't exist</Text>
            )}
          </View>
        </LinearGradient>
      </Modal>
    );
  }
}

export default AddFriendModal;

import React, { Component } from "react";
import {
  View,
  Platform,
  ScrollView,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import { BlurView } from "@react-native-community/blur";
import KeyboardManager from "react-native-keyboard-manager";
import Modal from "react-native-modal";
import {
  Screen,
  Touchable,
  Image,
  Text,
  SearchInput,
  DiscoverPeopleItem,
} from "@components";
import ModalFriendItem from "./modal-friend-item";

import Images from "@assets/Images";

import styles from "./invite-friend-modal.style";

class InviteFriendsModal extends Component {
  constructor(props) {
    super(props);
  }

  onModalShow = () => {
    if (Platform.OS === "ios") {
      KeyboardManager.setEnable(true);
    }
  };

  onModalHide = () => {
    if (Platform.OS === "ios" && this.props.keyboardDisable) {
      KeyboardManager.setEnable(false);
    }
  };

  renderFriends = () => {
    let friends = [1, 2, 3, 4, 5, 6];
    return friends.map((friend, index) => {
      return <ModalFriendItem key={`invite-item-${index}`} />;
    });
  };

  renderContent = () => {
    return (
      <View style={styles.container}>
        <Touchable
          style={styles.backButton}
          onPress={() => {
            this.props.onDismiss && this.props.onDismiss();
          }}
        >
          <Image source={Images.app.icBack} style={styles.backImage} />
        </Touchable>
        <Screen hasGradient style={styles.container}>
          <SafeAreaView style={styles.contentContainer}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
              <Text style={styles.titleText}>Invite Friends</Text>

              <SearchInput
                onSearch={() => {}}
                onRef={ref => {}}
                containerStyle={styles.searchContainer}
              />

              <Text style={styles.subtitleText}>Discover New People</Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.peopleList}
                data={[1, 2, 3, 4]}
                keyExtractor={(item, index) => `new-people-${item}`}
                renderItem={({ item: item, index }) => {
                  return <DiscoverPeopleItem />;
                }}
              />

              <Text style={styles.subtitleText}>Friends</Text>
              {this.renderFriends()}
            </ScrollView>
          </SafeAreaView>
        </Screen>
      </View>
    );
  };

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
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior={"height"} enabled>
            {this.renderContent()}
          </KeyboardAvoidingView>
        ) : (
          this.renderContent()
        )}
      </Modal>
    );
  }
}

export default InviteFriendsModal;

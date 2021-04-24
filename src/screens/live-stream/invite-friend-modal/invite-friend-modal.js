import React, { useEffect, useState } from "react";
import {
  View,
  Platform,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { BlurView } from "@react-native-community/blur";
import KeyboardManager from "react-native-keyboard-manager";
import EventBus from "eventing-bus";
import {
  Screen,
  Touchable,
  Image,
  Text,
  SearchInput,
  ModalBase as Modal,
} from "@components";
import ModalFriendItem from "./modal-friend-item";
import { API } from "@helpers";
import { API_ENDPOINTS } from "@config";

import Images from "@assets/Images";

import styles from "./invite-friend-modal.style";

const InviteFriendsModal: () => React$Node = props => {
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const { onDismiss } = props;

  useEffect(() => {
    const _closeAction = EventBus.on("Modal_Close", () => {
      onDismiss && onDismiss();
    });
    return () => {
      _closeAction();
    };
  }, [onDismiss]);

  const onModalShow = () => {
    if (Platform.OS === "ios") {
      KeyboardManager.setEnable(true);
    }
    props.loadFriends(props.token);
  };

  const onModalHide = () => {
    if (Platform.OS === "ios" && props.keyboardDisable) {
      KeyboardManager.setEnable(false);
    }
  };

  const onInvite = user => {
    if (!invitedUsers.includes(user.id)) {
      setInvitedUsers([...invitedUsers, user.id]);
    }

    let data = new FormData();
    data.append("user_id", user.id);
    data.append("channel_id", props.stream.channel);
    API.request({
      method: "post",
      url: `${API_ENDPOINTS.STREAM_INVITE}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + props.token,
      },
      data,
    }).then(response => {
      // console.log(response.data.data);
    });
  };

  const renderFriends = () => {
    const { friends } = props;
    let filteredFriends = friends.filter(value => value.id !== 0);
    if (searchKeyword !== "") {
      filteredFriends = filteredFriends.filter(value =>
        value.first_name.toLowerCase().includes(searchKeyword.toLowerCase()),
      );
    }
    return filteredFriends.map((friend, index) => {
      return (
        <ModalFriendItem
          user={friend}
          onInviteFriend={() => onInvite(friend)}
          invitedFriends={invitedUsers}
          key={`invite-item-${index}`}
        />
      );
    });
  };

  const renderContent = () => {
    return (
      <View style={styles.container}>
        <Touchable
          style={styles.backButton}
          onPress={() => {
            onDismiss && onDismiss();
          }}
        >
          <Image source={Images.app.icBack} style={styles.backImage} />
        </Touchable>
        <Screen hasGradient style={styles.container}>
          <SafeAreaView style={styles.contentContainer}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
              <Text style={styles.titleText}>Invite Friends</Text>

              <SearchInput
                onSearch={txt => setSearchKeyword(txt)}
                onRef={ref => {}}
                containerStyle={styles.searchContainer}
              />

              <Text style={styles.subtitleText}>Friends</Text>
              {renderFriends()}
            </ScrollView>
          </SafeAreaView>
        </Screen>
      </View>
    );
  };

  return (
    <Modal
      {...props}
      customBackdrop={
        <Touchable
          style={styles.flexFill}
          onPress={() => {
            onDismiss && onDismiss();
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
      backdropOpacity={1}
      useNativeDriver={false}
      propagateSwipe={true}
      swipeDirection={"down"}
      onSwipeComplete={onDismiss}
      onModalShow={onModalShow}
      onModalWillHide={onModalHide}
      style={styles.modalContainer}
    >
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior={"height"} enabled>
          {renderContent()}
        </KeyboardAvoidingView>
      ) : (
        renderContent()
      )}
    </Modal>
  );
};

export default InviteFriendsModal;

import React, { useState, useEffect } from "react";
import { SafeAreaView, View, FlatList, TouchableOpacity, Keyboard, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "@react-native-community/blur";
import { GRADIENT } from "@config";
import { StreamStatus } from "@constants";

import { widthPercentageToDP as wp } from "@helpers";
import LinearGradient from "react-native-linear-gradient";
import EventBus from "eventing-bus";
import ReportModal from "../../report-modal";
import InviteFriendsModal from "../invite-friend-modal";
import StreamMessageBox from "../stream-message-box";
import StreamUsers from "../stream-users";
import StreamHeader from "../stream-header";
import StreamStart from "../stream-start";
import StreamPlayerSetting from "../stream-player-setting";
import StreamSpeakerView from "../stream-speaker-view";
import StreamAskModal from "../stream-ask-modal";

import styles from "./stream-overlay-view.style";

const StreamOverlayView = props => {
  const insets = useSafeAreaInsets();
  const [showUsers, setShowUsers] = useState(false);
  const [showPlayerSetting, setShowPlayerSetting] = useState(false);
  const [visibleReport, setVisibleReport] = useState(false);
  const [visibleInviteFriends, setVisibleInviteFriends] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [messageBoxHeight, setMessageBoxHeight] = useState("50%");
  const [visibleAskModal, setVisibleAskModal] = useState(false);
  const userId = props.user.id;

  const onStartLivestream = () => {
    // call the api to create new stream
    props.setStreamStatus(StreamStatus.STARTED);
  };

  const onKeyboardShow = e => {
    if (visibleInviteFriends) return;
    setKeyboardHeight(e.endCoordinates.height);
    setMessageBoxHeight(300);
  };

  const onKeyboardHide = e => {
    if (visibleInviteFriends) return;
    setKeyboardHeight(0);
    setMessageBoxHeight("50%");
  };

  useEffect(() => {
    const userAcceptJoin = EventBus.on("Stream_user_accept_join", async jsonData => {
      if (jsonData === undefined) return;
      let data = JSON.parse(jsonData);
      if (data.user._id === userId) {
        setVisibleAskModal(false);
      }
    });
    return () => {
      userAcceptJoin();
    };
  }, [userId]);

  return (
    <View style={styles.container} pointerEvents={"box-none"}>
      {props.streamStatus === StreamStatus.PREPARING && (
        <View style={styles.opacityFill} />
      )}
      {props.streamStatus === StreamStatus.PREPARING && (
      <LinearGradient
        colors={GRADIENT.FADE_UP}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[styles.opacityBottom]}
      />)}

      {props.streamStatus === StreamStatus.PREPARING ? (
        <StreamStart
          navigation={props.navigation}
          onStartLivestream={onStartLivestream}
          onBack={props.onLeaveRoom}
          streamParams={props.streamParams}
        />
      ) : (
        <SafeAreaView style={styles.container} pointerEvents={"box-none"}>
          {messageBoxHeight === 300 && (
            <TouchableOpacity
              style={styles.absolute}
              onPress={() => Keyboard.dismiss()}
            />
          )}
          {props.streamerCount > 0 && (
            <View style={[styles.broadcasterContainer, { top: insets.top + wp(50) }]}>
              <FlatList
                keyboardShouldPersistTaps={"always"}
                data={props.broadcasters}
                style={styles.broadcasterList}
                keyExtractor={item => `broadcasters-${item._id}`}
                renderItem={({ item: broadcaster, index }) => (
                  <StreamSpeakerView
                    broadcaster={broadcaster}
                    style={styles.streamUserContainer}
                    imageStyle={styles.streamUser}
                    onShowProfile={props.onShowProfile}
                  />
                )}
              />
            </View>
          )}

          <View
            style={[
              styles.messageBox,
              Platform.OS === "ios" ? 
              { bottom: keyboardHeight, height: messageBoxHeight } : {},
            ]}
          >
            <StreamMessageBox
              streamStatus={props.streamStatus}
              isBroadcaster={props.isBroadcaster}
              streamParams={props.streamParams}
              onKeyboardShow={onKeyboardShow}
              onKeyboardHide={onKeyboardHide}
              onPlayerSetting={() => setShowPlayerSetting(true)}
              onAskToJoin={() => setVisibleAskModal(true)}
              onShowProfile={props.onShowProfile}
              bottomPadding={keyboardHeight > 0 ? 5 : insets.bottom + 5}
            />
          </View>

          {showUsers && (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.absolute}
              onPress={() => {
                setShowUsers(false);
                setShowPlayerSetting(false);
              }}
            >
              <BlurView
                style={styles.absolute}
                blurType='dark'
                blurAmount={10}
                reducedTransparencyFallbackColor='rgba(11, 5, 22, 0.9)'
              />
            </TouchableOpacity>
          )}

          <StreamHeader
            navigation={props.navigation}
            streamStatus={props.streamStatus}
            showUsers={() => {
              setShowPlayerSetting(false);
              setShowUsers(true);
              props.setIsScrolling(true);
              Keyboard.dismiss();
            }}
            onBack={() => {
              props.onMinimized();
              Keyboard.dismiss();
            }}
          />

          {showPlayerSetting && (
            <StreamPlayerSetting
              onHidePlayerSetting={() => setShowPlayerSetting(false)}
            />
          )}
          {showUsers && (
            <View style={styles.usersContainer}>
              <StreamUsers
                setIsScrolling={props.setIsScrolling}
                isBroadcaster={props.isBroadcaster}
                streamParams={props.streamParams}
                onReport={() => setVisibleReport(true)}
                onInviteFriends={() => setVisibleInviteFriends(true)}
                onShowProfile={user => {
                  props.onShowProfile(user);
                }}
              />
            </View>
          )}
          <ReportModal
            isVisible={visibleReport}
            liveStream
            channelId={props.streamParams.channelName}
            keyboardDisable={true}
            onDismiss={() => setVisibleReport(false)}
          />

          <InviteFriendsModal
            isVisible={visibleInviteFriends}
            keyboardDisable={true}
            onDismiss={() => setVisibleInviteFriends(false)}
          />

          <StreamAskModal
            isVisible={visibleAskModal}
            onBack={() => setVisibleAskModal(false)}
            streamParams={props.streamParams}
          />
        </SafeAreaView>
      )}
    </View>
  );
};

export default StreamOverlayView;

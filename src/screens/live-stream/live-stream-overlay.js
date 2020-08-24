import React, { useState } from "react";
import { SafeAreaView, View, FlatList } from "react-native";
import { BlurView } from "@react-native-community/blur";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT } from "@config";
import { StreamStatus } from "@constants";
import { connect } from "react-redux";
import { LiveCreators } from "@redux/actions";

import ReportModal from "../report-modal";
import InviteFriendsModal from "./invite-friend-modal";
import StreamMessageBox from "./stream-message-box";
import StreamUsers from "./stream-users";
import StreamHeader from "./stream-header";
import StreamStart from "./stream-start";
import StreamPlayerSetting from "./stream-player-setting";
import StreamUserIcon from "./stream-user-icon";

import styles from "./live-stream.style";

const LiveStreamOverlay = props => {
  const [showUsers, setShowUsers] = useState(false);
  const [showPlayerSetting, setShowPlayerSetting] = useState(false);
  const [visibleReport, setVisibleReport] = useState(false);
  const [visibleInviteFriends, setVisibleInviteFriends] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(10);
  const [messageBoxHeight, setMessageBoxHeight] = useState("50%");

  const onStartLivestream = () => {
    // call the api to create new stream
    props.setStreamStatus(StreamStatus.WAITING);
  };

  const onKeyboardShow = e => {
    if (visibleInviteFriends) return;
    setKeyboardHeight(e.endCoordinates.height);
    setMessageBoxHeight(200);
  };

  const onKeyboardHide = e => {
    if (visibleInviteFriends) return;
    setKeyboardHeight(10);
    setMessageBoxHeight("50%");
  };

  return (
    <View style={styles.container}>
      {props.streamStatus === StreamStatus.STARTING && (
        <View style={styles.opacityFill} />
      )}
      <LinearGradient
        colors={GRADIENT.FADE_UP}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[styles.opacityBottom]}
      />

      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.safeAreaContainer}>
          {props.streamStatus === StreamStatus.STARTING ? (
            <StreamStart
              navigation={props.navigation}
              onStartLivestream={onStartLivestream}
              onBack={props.onLeaveRoom}
              streamParams={props.streamParams}
            />
          ) : (
            <View style={styles.safeAreaContainer}>
              <StreamHeader
                navigation={props.navigation}
                streamStatus={props.streamStatus}
                showUsers={() => {
                  setShowUsers(true);
                  props.setIsScrolling(true);
                }}
                onBack={props.onMinimized}
              />
              <View
                style={[
                  styles.messageBox,
                  { bottom: keyboardHeight, height: messageBoxHeight },
                ]}
              >
                <StreamMessageBox
                  streamStatus={props.streamStatus}
                  onKeyboardShow={onKeyboardShow}
                  onKeyboardHide={onKeyboardHide}
                  onPlayerSetting={() => setShowPlayerSetting(true)}
                />
              </View>
              {props.currentStream !== null && (
                <View style={styles.streamUserContainer}>
                  <FlatList
                    style={styles.usersList}
                    contentContainerStyle={styles.usersListContentContainerStyle}
                    data={props.currentStream.broadcasters}
                    keyExtractor={item => `broadcasters-${item._id}`}
                    renderItem={({ item: broadcaster, index }) => (
                      <StreamUserIcon user={broadcaster} style={styles.streamUser} />
                    )}
                  />
                </View>
              )}
            </View>
          )}
        </View>
      </SafeAreaView>

      {(showUsers || showPlayerSetting) && (
        <BlurView
          style={styles.absolute}
          blurType='dark'
          blurAmount={10}
          reducedTransparencyFallbackColor='white'
        />
      )}

      {showUsers && (
        <View style={styles.usersContainer}>
          <StreamUsers
            setShowUsers={setShowUsers}
            setIsScrolling={props.setIsScrolling}
            onReport={() => setVisibleReport(true)}
            onInviteFriends={() => setVisibleInviteFriends(true)}
          />
        </View>
      )}
      {showPlayerSetting && (
        <StreamPlayerSetting onHidePlayerSetting={() => setShowPlayerSetting(false)} />
      )}

      <ReportModal
        isVisible={visibleReport}
        keyboardDisable={true}
        onDismiss={() => setVisibleReport(false)}
      />

      <InviteFriendsModal
        isVisible={visibleInviteFriends}
        keyboardDisable={true}
        onDismiss={() => setVisibleInviteFriends(false)}
      />
    </View>
  );
};

function mapStateToProps(state) {
  return {
    streamStatus: state.live.streamStatus,
    currentStream: state.live.currentStream,
  };
}

const mapDispatchToProps = {
  setStreamStatus: LiveCreators.setStreamStatus,
  setIsScrolling: LiveCreators.setIsScrolling,
};

export default connect(mapStateToProps, mapDispatchToProps)(LiveStreamOverlay);

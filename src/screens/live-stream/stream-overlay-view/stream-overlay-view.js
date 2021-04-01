import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, View, FlatList, TouchableOpacity, Keyboard, Platform } from "react-native";
import { BoostConfirmModal } from "@components";
import AsyncStorage from "@react-native-community/async-storage";
import moment from "moment";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "@react-native-community/blur";
import { GRADIENT } from "@config";
import { StreamStatus, TUTORIAL } from "@constants";

import { widthPercentageToDP as wp } from "@helpers";
import LinearGradient from "react-native-linear-gradient";
import EventBus from "eventing-bus";
import ReportModal from "../../report-modal";
import InviteFriendsModal from "../invite-friend-modal";
import StreamMessageBox from "../stream-message-box";
import StreamUsers from "../stream-users";
import StreamHeader from "../stream-header";
import StreamStart from "../stream-start";
import StreamFilters from "../stream-filters";
import StreamPlayerSetting from "../stream-player-setting";
import StreamSpeakerView from "../stream-speaker-view";
import BoostTimeModal from "../../swipe/boost-time-modal";
import SwipePurchaseModal from "../../swipe/swipe-purchase-modal";

import styles from "./stream-overlay-view.style";

const StreamOverlayView: () => React$Node = props => {
  const insets = useSafeAreaInsets();
  const [showUsers, setShowUsers] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showPlayerSetting, setShowPlayerSetting] = useState(false);
  const [visibleReport, setVisibleReport] = useState(false);
  const [visibleInviteFriends, setVisibleInviteFriends] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [messageBoxHeight, setMessageBoxHeight] = useState("50%");
  const [visibleRemainingBoost, setVisibleRemainingBoost] = useState(false);
  const [boosting, setBoosting] = useState(false);
  const boostInterval = useRef(null);
  const [visibleBoost, setVisibleBoost] = useState(false);
  const [visibleBoostConfirm, setVisibleBoostConfirm] = useState(false);
  const [visibleTutorialUsers, setVisibleTutorialUsers] = useState(false);
  const userId = props.user.id;
  let splitedNames = props.streamParams.channelName.split("-");
  const isOwner = parseInt(splitedNames[1], 10) === parseInt(userId, 10);

  const onStartLivestream = () => {
    // call the api to create new stream
    props.setStreamStatus(StreamStatus.STARTED);
  };

  useEffect(() => {
    AsyncStorage.getItem(TUTORIAL.USERS, (err, result) => {
      if (result === null || result === "0") {
        setVisibleTutorialUsers(true);
      }
    });
  }, []);

  useEffect(() => {
    let keyboardShowListener, keyboardHideListener;
    if (Platform.OS === "ios") {
      keyboardShowListener = Keyboard.addListener("keyboardWillShow", (e) => {
        if (visibleInviteFriends) return;
        setKeyboardHeight(e.endCoordinates.height);
        setMessageBoxHeight(300);
      });
      keyboardHideListener = Keyboard.addListener("keyboardWillHide", (e) => {
        if (visibleInviteFriends) return;
        setKeyboardHeight(0);
        setMessageBoxHeight("50%");
      });
    } else {
      keyboardShowListener = Keyboard.addListener("keyboarDidShow", (e) => {
        if (visibleInviteFriends) return;
        setKeyboardHeight(e.endCoordinates.height);
        setMessageBoxHeight(300);
      });
      keyboardHideListener = Keyboard.addListener("keyboardDidHide", (e) => {
        if (visibleInviteFriends) return;
        setKeyboardHeight(0);
        setMessageBoxHeight("50%");
      });
    }
    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    }
  }, [visibleInviteFriends]);

  useEffect(() => {
    if (props.inviteOnly === 1) {
      setBoosting(false);
    } else {
      let boostTime = props.boostEndTime;
      if (boostTime) {
        let duration = moment.unix(boostTime).diff(moment(), "seconds");
        if (duration > 0) {
          setBoosting(true);
          let restSeconds = duration;
          boostInterval.current = setInterval(() => {
            if (restSeconds < 2) {
              clearInterval(boostInterval.current);
              setBoosting(false);
            } else {
              restSeconds -= 1;
            }
          }, 1000);
        } else {
          setBoosting(false);
        }
      }
    }
    return () => {
      clearInterval(boostInterval.current);
    }
  }, [props.boostEndTime, props.inviteOnly]);

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
          {(messageBoxHeight === 300 || showPlayerSetting) && (
            <TouchableOpacity
              style={styles.absolute}
              onPress={() => {
                if (showPlayerSetting) {
                  setShowPlayerSetting(false);
                } else {
                  Keyboard.dismiss()
                }
              }}
            />
          )}
          {props.streamerCount > 0 && (
            <TouchableOpacity style={[styles.broadcasterContainer, { top: insets.top + wp(50) }]}
              onPress={() => {
                if (showPlayerSetting) {
                  setShowPlayerSetting(false);
                } else {
                  Keyboard.dismiss()
                }
              }}>
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
                    isGesture={isOwner ? 
                      (parseInt(broadcaster._id, 10) || parseInt(broadcaster.id, 10)) === parseInt(userId, 10) ? false : true : false}
                  />
                )}
              />
            </TouchableOpacity>
          )}

          {!showPlayerSetting &&
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
              keyboardHeight={keyboardHeight}
              onPlayerSetting={() => setShowPlayerSetting(true)}
              onAskToJoin={() => props.onShowAskModal && props.onShowAskModal(true)}
              onShowProfile={props.onShowProfile}
              bottomPadding={keyboardHeight > 0 ? 5 : insets.bottom + 5}
            />
          </View>}

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
            boosting={boosting}
            onBoost={() => setVisibleRemainingBoost(true)}
            showUsers={() => {
              setShowPlayerSetting(false);
              setShowUsers(true);
              props.setIsScrolling(true);
              Keyboard.dismiss();

              // remove tutorial view
              setVisibleTutorialUsers(false);
              AsyncStorage.setItem(TUTORIAL.USERS, "1");
            }}
            onBack={() => {
              props.onMinimized();
              Keyboard.dismiss();
            }}
            showTutorial={visibleTutorialUsers}
          />

          {showFilters &&
          <StreamFilters onBack={() => {
            setShowFilters(false);
            setShowPlayerSetting(true);
          }} />}
          {showPlayerSetting && (
            <StreamPlayerSetting
              onHidePlayerSetting={() => setShowPlayerSetting(false)}
              onShowFilters={() => {
                setShowPlayerSetting(false);
                setShowFilters(true);
              }}
            />
          )}
          {showUsers && (
            <View style={styles.usersContainer} pointerEvents={"box-none"}>
              <StreamUsers
                setIsScrolling={props.setIsScrolling}
                isBroadcaster={props.isBroadcaster}
                streamParams={props.streamParams}
                onReport={() => setVisibleReport(true)}
                onInviteFriends={() => setVisibleInviteFriends(true)}
                onShowProfile={user => {
                  props.onShowProfile(user);
                }}
                onBoost={() => {
                  if (boosting) {
                    setVisibleRemainingBoost(true);
                    return;
                  }
                  const { user } = props;
                  let boostsCount = parseInt(user.advanced.boosts, 10);
                  if (boostsCount > 0) {
                    setVisibleBoostConfirm(true);
                  } else {
                    setVisibleBoost(true);
                  }
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

          <BoostTimeModal 
            isVisible={visibleRemainingBoost}
            onBack={() => setVisibleRemainingBoost(false)}
            onBoost={() => {
              setVisibleRemainingBoost(false);
              const { user } = props;
              let boostsCount = parseInt(user.advanced.boosts, 10);
              if (boostsCount > 0) {
                props.runBoost(props.token, 2, props.streamParams.channelName);
              } else {
                setTimeout(() => {
                  setVisibleBoost(true);
                }, 500);
              }
            }}
            isSwipe={false}
            buttonDisable={props.isBoosting}
          />

          <BoostConfirmModal
            isVisible={visibleBoostConfirm}
            title={"Boost the live"}
            content={"Boost your live and bring a lot of people!"}
            onBack={() => setVisibleBoostConfirm(false)}
            onBoost={() => {
              props.runBoost(props.token, 2, props.streamParams.channelName);
              setVisibleBoostConfirm(false);
            }} 
          />
            
          <SwipePurchaseModal
            isVisible={visibleBoost}
            uptoLogo
            purchaseType={"boost"}
            onConfirm={() => setVisibleBoost(false)}
            onPluzoPlus={() => setVisibleBoost(false)}
            onHide={() => setVisibleBoost(false)}
          />
        </SafeAreaView>
      )}
    </View>
  );
};

export default StreamOverlayView;

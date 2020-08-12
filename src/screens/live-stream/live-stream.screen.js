import React, { Component } from "react";
import { SafeAreaView, View, FlatList } from "react-native";
import { Image, Touchable } from "@components";
import { BlurView } from "@react-native-community/blur";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT } from "@config";
import { StreamStatus } from "@constants";
import StreamPlayer from "./stream-player";
import ReportModal from "./report-modal";
import InviteFriendsModal from "./invite-friend-modal";
import Images from "@assets/Images";

import styles from "./live-stream.style";

import StreamUserIcon from "./stream-user-icon";
import StreamMessageBox from "./stream-message-box";
import StreamUsers from "./stream-users";
import StreamHeader from "./stream-header";
import StreamStart from "./stream-start";
import StreamPlayerSetting from "./stream-player-setting";

class LiveStream extends Component {
  constructor(props) {
    super(props);
    let streamStatus = this.props.navigation.state.params.streamStatus;
    if (streamStatus === undefined || streamStatus === null) {
      streamStatus = StreamStatus.STARTED;
    }
    this.state = {
      showUsers: false,
      showPlayerSetting: false,
      visibleReport: false,
      visibleInviteFriends: false,
      keyboardHeight: 10,
      messageBoxHeight: "50%",
      streamStatus,
    };
  }

  onStartLivestream = () => {
    // call the api to create new stream
    this.setState({streamStatus: StreamStatus.WAITING});
  }

  onKeyboardShow = e => {
    const { visibleInviteFriends } = this.state;
    if (visibleInviteFriends) return;
    this.setState({
      keyboardHeight: e.endCoordinates.height,
      messageBoxHeight: 200,
    });
  };

  onKeyboardHide = e => {
    const { visibleInviteFriends } = this.state;
    if (visibleInviteFriends) return;
    this.setState({
      keyboardHeight: 10,
      messageBoxHeight: "50%",
    });
  };

  showUsers = () => {
    this.setState({ showUsers: true });
  };

  hideUsers = () => {
    this.setState({ showUsers: false });
  };

  render() {
    const { 
      streamStatus,
      showUsers,
      showPlayerSetting,
      keyboardHeight,
      messageBoxHeight,
    } = this.state;
    var data = [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }];

    return (
      <View style={styles.container}>
        
        <StreamPlayer navigation={this.props.navigation} style={styles.streamPlayer} />
        {
          streamStatus === StreamStatus.STARTING &&
          <View style={styles.opacityFill} />
        }
        <LinearGradient
          colors={GRADIENT.FADE_UP}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[styles.opacityBottom]}
        />
        
        <SafeAreaView style={styles.safeAreaContainer}>
          <View style={styles.safeAreaContainer}>
            {
              streamStatus === StreamStatus.STARTING ? (
                <StreamStart
                  navigation={this.props.navigation}
                  onStartLivestream={this.onStartLivestream} />
              ) : (
                <View style={styles.safeAreaContainer}>
                  <StreamHeader
                    navigation={this.props.navigation}
                    streamStatus={streamStatus}
                    showUsers={this.showUsers}
                  />
                  <View
                    style={[
                      styles.messageBox,
                      { bottom: keyboardHeight, height: messageBoxHeight },
                    ]}
                  >
                    <StreamMessageBox
                      streamStatus={streamStatus}
                      onKeyboardShow={this.onKeyboardShow}
                      onKeyboardHide={this.onKeyboardHide}
                      onPlayerSetting={() => this.setState({showPlayerSetting: true})}
                    />
                  </View>
                </View>
              )
            }

            {/* 
            <View style={styles.streamUserContainer}>
              <FlatList
                style={styles.usersList}
                contentContainerStyle={styles.usersListContentContainerStyle}
                data={data}
                keyExtractor={item => item.id}
                renderItem={({ item: tag, index }) => (
                  <StreamUserIcon style={styles.streamUser} />
                )}
              />
            </View> */}
          </View>
        </SafeAreaView>

        {
          (showUsers || showPlayerSetting) &&
          <BlurView
            style={styles.absolute}
            blurType='dark'
            blurAmount={10}
            reducedTransparencyFallbackColor='white'
          />
        }

        {showUsers && (
          <View style={styles.usersContainer}>
            <Touchable style={styles.absolute} onPress={this.hideUsers} />
            <StreamUsers
              onReport={() => this.setState({visibleReport: true})}
              onInviteFriends={() => this.setState({visibleInviteFriends: true})} />
          </View>
        )}
        {
          showPlayerSetting && 
          <StreamPlayerSetting 
            onHidePlayerSetting={() => this.setState({showPlayerSetting: false})} />
        }

        <ReportModal
          isVisible={this.state.visibleReport}
          keyboardDisable={true}
          onDismiss={() => this.setState({visibleReport: false})} />
        
        <InviteFriendsModal 
          isVisible={this.state.visibleInviteFriends}
          keyboardDisable={true}
          onDismiss={() => this.setState({visibleInviteFriends: false})} />
      </View>
    );
  }
}

LiveStream.defaultProps = {
  streamStatus: StreamStatus.STARTED,
};

export default LiveStream;

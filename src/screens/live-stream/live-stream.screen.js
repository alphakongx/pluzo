import React, { Component } from "react";
import { View } from "react-native";
import { ModalBase as Modal } from "@components";
import { StreamStatus } from "@constants";
import StreamPlayer from "./stream-player";
import StreamOverlayView from "./stream-overlay-view";
import ProfileView from "../profile-view";
import StreamEndModal from "./stream-end-modal";
import StreamAskModal from "./stream-ask-modal";
import KeepAwake from "@sayem314/react-native-keep-awake";
import { isStreamLive } from "@redux/api";
import EventBus from "eventing-bus";

import styles from "./live-stream.style";

class LiveStream extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBroadcaster: this.props.streamParams.isBroadcaster,
      streamerCount: 1,
      selectedUser: null,
      visibleProfile: false,
      visibleEnd: false,
      visibleAskModal: false,
    };
  }

  componentDidMount() {
    this.props.setAskedToJoin(false);
    if (this.props.streamParams.isJoin) {
      let requestParams = new FormData();
      requestParams.append("channel_id", this.props.streamParams.channelName);
      isStreamLive(requestParams, this.props.token).then(response => {
        if (response.data.data === false) {
          this.setState({visibleEnd: true});
        }
      });
    }

    this._closeAction = EventBus.on("Modal_Close", () => {
      this.setState({ visibleProfile: false });
    });
  }

  componentWillUnmount() {
    this._closeAction();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isBroadcaster !== this.state.isBroadcaster) {
      this.props.onChangedRole(this.state.isBroadcaster);
    }
  }

  onShowProfile = user => {
    this.setState({ selectedUser: user, visibleProfile: true });
  };

  render() {
    const { minimized } = this.props;

    return (
      <View style={styles.container}>
        <KeepAwake />
        <StreamPlayer
          navigation={this.props.navigation}
          streamParams={this.props.streamParams}
          isBroadcaster={this.state.isBroadcaster}
          style={styles.streamPlayer}
          onEndedStream={() => this.setState({ visibleEnd: true })}
          onLeaveRoom={this.props.onLeaveRoom}
          onChangeRole={broadcaster => this.setState({ isBroadcaster: broadcaster })}
          onChangeStreamers={count => {
            this.setState({ streamerCount: count });
          }}
          onShowAskModal={(value) => this.setState({visibleAskModal: value})}
          onShowProfile={user => this.onShowProfile(user)}
          minimized={minimized}
        />

        {!minimized ? (
          <StreamOverlayView
            isBroadcaster={this.state.isBroadcaster}
            streamerCount={this.state.streamerCount}
            navigation={this.props.navigation}
            streamParams={this.props.streamParams}
            onLeaveRoom={this.props.onLeaveRoom}
            onMinimized={this.props.onMinimized}
            onShowProfile={user => this.onShowProfile(user)}
            onShowAskModal={(value) => this.setState({visibleAskModal: value})}
          />
        ) : null}

        <Modal isVisible={this.state.visibleProfile} style={styles.profileModal}>
          <View style={styles.container}>
            {this.state.selectedUser && (
              <ProfileView
                user={this.state.selectedUser}
                goBack={() => this.setState({ visibleProfile: false })}
              />
            )}
          </View>
        </Modal>

        <StreamEndModal
          isVisible={this.state.visibleEnd}
          onLeaveRoom={this.props.onLeaveRoom}
        />

        <StreamAskModal
          isVisible={this.state.visibleAskModal}
          onBack={() => this.setState({visibleAskModal: false})}
          streamParams={this.props.streamParams}
        />
      </View>
    );
  }
}

LiveStream.defaultProps = {
  streamStatus: StreamStatus.JOINED,
};

export default LiveStream;

import React, { Component } from "react";
import { View } from "react-native";
import { StreamStatus } from "@constants";
import StreamPlayer from "./stream-player";
import LiveStreamOverlay from "./live-stream-overlay";

import styles from "./live-stream.style";

class LiveStream extends Component {
  render() {
    const { minimized } = this.props;

    return (
      <View style={styles.container}>
        <StreamPlayer
          navigation={this.props.navigation}
          streamParams={this.props.streamParams}
          style={styles.streamPlayer}
        />

        {!minimized ? (
          <LiveStreamOverlay
            navigation={this.props.navigation}
            streamParams={this.props.streamParams}
            onLeaveRoom={this.props.onLeaveRoom}
            onMinimized={this.props.onMinimized}
          />
        ) : null}
      </View>
    );
  }
}

LiveStream.defaultProps = {
  streamStatus: StreamStatus.STARTED,
};

export default LiveStream;

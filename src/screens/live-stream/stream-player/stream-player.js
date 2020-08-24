import React, { Component } from "react";
import { View, PermissionsAndroid, Platform } from "react-native";
import { RTCENGINE } from "@config";
import RtcEngine, { RtcLocalView, RtcRemoteView, Types } from "react-native-agora";

import styles from "./stream-player.style";

class StreamPlayer extends Component {
  constructor(props) {
    super(props);
    const { streamParams } = this.props;
    const { channelName, isBroadcaster } = streamParams;
    this.state = {
      appId: RTCENGINE.appId,
      channelName: channelName,
      isBroadcaster: isBroadcaster,
      joinSucceed: false,
      streamerIds: [],
    };
    this._engine = null;

    if (Platform.OS === "android") {
      this.requestCameraAndAudioPermission().then(() => {
        console.log("requested!");
      });
    }
  }

  componentDidMount() {
    this.init();
  }

  async componentWillUnmount() {
    await this._engine.leaveChannel();
    this._engine.destroy();

    let names = this.state.channelName.split("-");
    if (names.length > 1) {
      if (parseInt(this.props.user.id, 10) === parseInt(names[1], 10)) {
        let params = { channel_id: this.props.streamParams.channelName };
        this.props.streamStop(params, this.props.token);
      }
    }
  }

  requestCameraAndAudioPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
      if (
        granted["android.permission.RECORD_AUDIO"] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted["android.permission.CAMERA"] === PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log("You can use the cameras & mic");
      } else {
        console.log("Permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  init = async () => {
    const { appId, channelName, isBroadcaster } = this.state;
    this._engine = await RtcEngine.create(appId);
    this._engine.setChannelProfile(Types.ChannelProfile.LiveBroadcasting);

    if (isBroadcaster) {
      this._engine.setClientRole(Types.ClientRole.Broadcaster);
    } else {
      this._engine.setClientRole(Types.ClientRole.Audience);
    }
    this._engine
      .setVideoEncoderConfiguration({
        frameRate: Types.VideoFrameRate.Fps60,
        minFrameRate: Types.VideoFrameRate.Fps30,
        degradationPrefer: Types.DegradationPreference.MaintainQuality,
      })
      .catch(e => {
        console.log(e);
      });
    await this._engine.enableVideo();
    this.addRtcListeners();
    this._engine.joinChannel(null, channelName, null, this.props.user.id);
  };

  addRtcListeners = () => {
    this._engine.addListener("UserJoined", (uid, elapsed) => {
      console.log("UserJoined", uid, elapsed);
      this.updateChannelInformation();
    });

    this._engine.addListener("UserOffline", (uid, reason) => {
      console.log("UserOffline", uid, reason);
      this.updateChannelInformation();
      const { streamerIds } = this.state;
      this.setState({
        streamerIds: streamerIds.filter(id => id !== uid),
      });
    });

    this._engine.addListener("JoinChannelSuccess", (channel, uid, elapsed) => {
      console.log("JoinChannelSuccess", channel, uid, elapsed);
      this.updateChannelInformation();
      this.setState({
        joinSucceed: true,
      });
    });

    this._engine.addListener("RemoteVideoStateChanged", (uid, state, reason, elapsed) => {
      if (state === Types.VideoRemoteState.Decoding) {
        const { streamerIds } = this.state;
        if (streamerIds.indexOf(uid) === -1) {
          this.setState({
            streamerIds: [...streamerIds, uid],
          });
        }
      }
    });
  };

  updateChannelInformation = () => {
    const { channelName } = this.state;
    this.props.streamUserList(channelName, this.props.token);
  };

  renderVideoView = uid => {
    const { channelName } = this.state;
    if (this.props.user.id === uid) {
      return (
        <RtcLocalView.SurfaceView
          style={styles.flexFill}
          channelId={channelName}
          renderMode={Types.VideoRenderMode.Hidden}
        />
      );
    } else {
      return (
        <RtcRemoteView.SurfaceView
          style={styles.flexFill}
          uid={uid}
          channelId={channelName}
          renderMode={Types.VideoRenderMode.Hidden}
          zOrderMediaOverlay={true}
        />
      );
    }
  };

  renderAllView = (streamUsers, isOdd) => {
    let startIndex = isOdd ? 1 : 0;
    let userCount = streamUsers.length;
    var videoViews = [];
    for (let i = startIndex; i < userCount; i += 2) {
      videoViews.push(
        <View
          key={`video-player-${i}`}
          style={userCount === 2 ? styles.flexColumn : styles.flexRow}
        >
          {this.renderVideoView(streamUsers[i])}
          {i + 1 < userCount && this.renderVideoView(streamUsers[i + 1])}
        </View>,
      );
    }
    return videoViews;
  };

  render() {
    const { joinSucceed, isBroadcaster, streamerIds } = this.state;
    var streamUsers = [];
    if (isBroadcaster && joinSucceed) {
      streamUsers = [this.props.user.id, ...streamerIds];
    } else {
      streamUsers = [...streamerIds];
    }
    const viewCounts = streamUsers.length;
    const isOdd = viewCounts % 2 !== 0;
    console.log("Stream Users", JSON.stringify(streamUsers));

    return (
      <View style={[styles.container, this.props.style]}>
        {isOdd && this.renderVideoView(streamUsers[0])}
        {this.renderAllView(streamUsers, isOdd)}
      </View>
    );
  }
}

export default StreamPlayer;

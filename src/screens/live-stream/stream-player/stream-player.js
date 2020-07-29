import React, { Component } from "react";
import { View, PermissionsAndroid } from "react-native";
import { Image } from "@components";
import { RTCENGINE } from "@config";
import RtcEngine, {RtcLocalView, RtcRemoteView, Types} from 'react-native-agora';

import styles from "./stream-player.style";

class StreamPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appId: RTCENGINE.appId,
      channelName: "channel-" + this.props.user.id,
      joinSucceed: false,
      peerIds: [],
    }
    this._engine = null;

    if (Platform.OS === 'android') {
      this.requestCameraAndAudioPermission().then(() => {
        console.log('requested!');
      });
    }
  }

  componentDidMount() {
    this.init();
  }

  async componentWillUnmount() {
    await this._engine.leaveChannel();
    this._engine.destroy();
  }

  requestCameraAndAudioPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
      if (
          granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
          && granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED
      ) {
          console.log('You can use the cameras & mic')
      } else {
          console.log('Permission denied')
      }
    } catch (err) {
        console.warn(err)
    }
  }

  init = async () => {
    const { appId, channelName } = this.state;
    this._engine = await RtcEngine.create(appId);
    this._engine.setChannelProfile(Types.ChannelProfile.LiveBroadcasting);
    this._engine.setClientRole(Types.ClientRole.Broadcaster);
    await this._engine.enableVideo();
        
    this._engine.addListener('UserJoined', (uid, elapsed) => {
      console.log('UserJoined', uid, elapsed);
      // Get current peer IDs
      const {peerIds} = this.state;
      // If new user
      if (peerIds.indexOf(uid) === -1) {
        this.setState({
          // Add peer ID to state array
          peerIds: [...peerIds, uid],
        });
      }
    });
    
    this._engine.addListener('UserOffline', (uid, reason) => {
      console.log('UserOffline', uid, reason);
      const {peerIds} = this.state
      this.setState({
        // Remove peer ID from state array
        peerIds: peerIds.filter(id => id !== uid),
      });
    });
    
    // If Local user joins RTC channel
    this._engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      console.log('JoinChannelSuccess', channel, uid, elapsed);
      // Set state variable to true
      this.setState({
        joinSucceed: true,
      });
    });

    this._engine.joinChannel(null, channelName, null, this.props.user.id);
  }

  render() {
    const {joinSucceed} = this.state;
    return (
      <View style={[styles.container, this.props.style]}>
        {
          joinSucceed ? (
            <RtcLocalView.SurfaceView
              style={{flex: 1, backgroundColor: "red"}}
              channelId={this.state.channelName}
              renderMode={Types.VideoRenderMode.FILL}/>
          ) : null
        }
        {/* <Image
          source={require("@assets/images/live-screen/user-temp2.png")}
          style={styles.image}
        /> */}
      </View>
    );
  }
}

export default StreamPlayer;

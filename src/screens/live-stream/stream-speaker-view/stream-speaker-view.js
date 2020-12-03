import React, { useEffect } from "react";
import { View } from "react-native";
import EventBus from "eventing-bus";
import * as Animatable from "react-native-animatable";
import StreamUserIcon from "../stream-user-icon";

import styles from "./stream-speaker-view.style";

const StreamSpeakerView: () => React$Node = props => {
  let volumeView = React.createRef();
  let broadcasterId =
    parseInt(props.broadcaster._id, 10) || parseInt(props.broadcaster.id, 10);
  if (broadcasterId === props.user.id) {
    broadcasterId = 0;
  }
  let isLarge = props.large;

  useEffect(() => {
    const updateSpeakerAction = EventBus.on("NEW_SPEAKERS", speakers => {
      let users = speakers.filter(speaker => speaker.uid === broadcasterId);
      if (volumeView !== null && users.length > 0) {
        let maxValue = isLarge ? 0.3 : 0.2;
        volumeView.animate(
          {
            0: {
              opacity: 1,
              scale: 0.9,
            },
            1: {
              opacity: 1,
              scale: 1 + (maxValue / 130) * users[0].volume,
            },
          },
          100,
        );
      }
    });
    return () => {
      updateSpeakerAction();
    };
  }, [volumeView, broadcasterId, isLarge]);

  return (
    <View style={props.style}>
      <Animatable.View
        style={isLarge ? styles.volumeContainer1 : styles.volumeContainer}
        ref={ref => (volumeView = ref)}
      />
      <StreamUserIcon
        user={props.broadcaster}
        style={props.imageStyle}
        onImagePress={
          props.onShowProfile
            ? () => {
                props.onShowProfile(props.broadcaster);
              }
            : null
        }
      />
    </View>
  );
};

export default StreamSpeakerView;

import React from "react";
import { View } from "react-native";
import { GradientButton } from "@components";
import { StreamStatus } from "@constants";
import StreamHeader from "../stream-header";

import styles from "./stream-start.style";

const StreamStart: () => React$Node = props => {

  const onStartLivestream = () => {
    props.onStartLivestream && props.onStartLivestream();
  }

  return (
    <View style={styles.container}>
      <StreamHeader
        navigation={props.navigation}
        streamStatus={StreamStatus.STARTING} />
      
      <View style={styles.liveButtonContainer}>
        <GradientButton
          onPress={onStartLivestream}
          containerStyle={styles.liveButton}
          text={"Start Livestream"} />
      </View>
    </View>
  );
};

export default StreamStart;

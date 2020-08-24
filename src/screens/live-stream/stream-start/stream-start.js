import React, { useState } from "react";
import { View } from "react-native";
import { GradientButton } from "@components";
import { StreamStatus } from "@constants";
import StreamHeader from "../stream-header";
import StreamEmojiView from "../stream-emoji-view";

import styles from "./stream-start.style";

const StreamStart: () => React$Node = props => {
  const [visibleCategory, setVisibleCategory] = useState(false);
  const [title, setTitle] = useState("");

  const onStartLivestream = () => {
    let params = {
      channel_id: props.streamParams.channelName,
      category: 1,
      name: title,
    };
    props.streamStart(params, props.token);
    props.onStartLivestream && props.onStartLivestream();
  };

  const onEmojiClick = () => {
    setVisibleCategory(!visibleCategory);
  };

  return (
    <View style={styles.container}>
      <StreamHeader
        navigation={props.navigation}
        streamStatus={StreamStatus.STARTING}
        onEmojiClick={onEmojiClick}
        onBack={props.onBack}
        onChangeTitle={text => setTitle(text)}
      />

      {visibleCategory && (
        <View style={styles.emojiContainer}>
          <StreamEmojiView />
        </View>
      )}

      <View style={styles.liveButtonContainer}>
        <GradientButton onPress={onStartLivestream} text={"Start Livestream"} />
      </View>
    </View>
  );
};

export default StreamStart;

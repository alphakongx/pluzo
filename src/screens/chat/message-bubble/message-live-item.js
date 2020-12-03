import React, { useState } from "react";
import { View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Touchable, Text, BoxShadow } from "@components";
import { widthPercentageToDP as wp } from "@helpers";
import { GRADIENT } from "@config";
import LiveItem from "../../live/live-item";

import styles from "./message-live-item.style";

const MessageLiveItem: () => React$Node = props => {
  const { currentMessage, isCurrentUser } = props;
  const [height, setHeight] = useState(1);
console.log(currentMessage.stream_info);
  const shadowOption = {
    width: wp(175),
    height: height,
    color: "#000000",
    opacity: 0.16,
    _borderRadius: wp(22),
    spread: 0,
    blur: 6,
    offsetX: 0,
    offsetY: 3,
  };

  if (currentMessage.type === "close") {
    return (
      <View style={styles.endContainer}>
        <Text style={styles.endText}>{"The Live has ended."}</Text>
        <BoxShadow setting={shadowOption} />
        <View style={[styles.liveContentContainer, styles.endContentPadding]}
          onLayout={(e) => setHeight(e.nativeEvent.layout.height)}>
          <Text numberOfLines={1} style={styles.liveNameText}>
            {currentMessage.stream_info.name === "" ? "No Name" : currentMessage.stream_info.name}
          </Text>
          <Text style={styles.liveCreatorText}>
            {currentMessage.user.first_name}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <Touchable onPress={() => console.log("OK")}>
      <LinearGradient
        colors={GRADIENT.BUTTON}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 1 }}
        style={styles.liveContainer}
      >
        <Text style={styles.liveJoinText}>Join</Text>
        <BoxShadow setting={shadowOption} />
        <View style={styles.liveContentContainer}
          onLayout={(e) => setHeight(e.nativeEvent.layout.height)}>
          <LiveItem item={currentMessage.stream_info}/>
        </View>
      </LinearGradient>
    </Touchable>
  )
};

export default MessageLiveItem;

import React, { useState } from "react";
import { View, TextInput as RNTextInput } from "react-native";
import { Touchable, Image, UserCount, BackDownButton } from "@components";
import { StreamStatus } from "@constants";
import Images from "@assets/Images";

import styles from "./stream-header.style";

const badges = require("@config/data/badges.json");

const StreamHeader: () => React$Node = props => {
  const [emojiOpacity, setEmojiOpacity] = useState(0.6);
  const [title, setTitle] = useState("");
  const { streamStatus } = props;

  return (
    <View style={styles.container}>
      <BackDownButton onPress={props.onBack} />

      {streamStatus === StreamStatus.PREPARING ? (
        <View style={styles.titleContainer}>
          <View style={styles.inputContainer}>
            <RNTextInput
              text={title}
              style={styles.inputTitle}
              multiline={false}
              placeholder={"Set a title"}
              placeholderTextColor={"white"}
              textContentType={"name"}
              autoCorrect={false}
              onChangeText={text => {
                setTitle(text);
                props.onChangeTitle && props.onChangeTitle(text);
              }}
            />
          </View>
          <Touchable
            onPress={() => {
              if (emojiOpacity === 1) {
                setEmojiOpacity(0.6);
              } else {
                setEmojiOpacity(1);
              }
              props.onEmojiClick();
            }}
            style={[styles.emojiButton, { opacity: emojiOpacity }]}
          >
            <Image source={Images.live[badges[props.selectedEmoji].icon]} />
          </Touchable>
        </View>
      ) : (
        <Touchable
          onPress={() => {
            props.showUsers && props.showUsers();
          }}
        >
          <UserCount
            style={styles.userCountStyle}
            textStyle={styles.userTextStyle}
            count={props.broadcasters.length + props.audiences.length}
          />
        </Touchable>
      )}
    </View>
  );
};

export default StreamHeader;

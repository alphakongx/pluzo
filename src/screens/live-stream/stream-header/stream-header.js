import React, { useState } from "react";
import { View, TextInput as RNTextInput } from "react-native";
import { Touchable, Image, UserCount, BackDownButton } from "@components";
import { StreamStatus } from "@constants";

import styles from "./stream-header.style";

const StreamHeader: () => React$Node = props => {
  const [emojiOpacity, setEmojiOpacity] = useState(0.6);
  const [title, setTitle] = useState("");
  const { streamStatus } = props;

  return (
    <View style={styles.container}>
      <BackDownButton onPress={props.onBack} />

      {streamStatus === StreamStatus.STARTING ? (
        <View style={styles.titleContainer}>
          <View style={styles.inputContainer}>
            <RNTextInput
              text={title}
              style={styles.inputTitle}
              multiline={false}
              placeholder={"Set a title"}
              placeholderTextColor={"white"}
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
            <Image source={require("@assets/images/live-screen/ic-category-tmp.png")} />
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
            count={1}
          />
        </Touchable>
      )}
    </View>
  );
};

export default StreamHeader;

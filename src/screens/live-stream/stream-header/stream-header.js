import React, { useState } from "react";
import { View, TextInput as RNTextInput } from "react-native";
import { Touchable, Image, UserCount, BackDownButton, Text, IconButton } from "@components";
import LinearGradient from "react-native-linear-gradient";
import { StreamStatus } from "@constants";
import { AppTags } from "@config";
import Images from "@assets/Images";

import styles from "./stream-header.style";

const StreamHeader: () => React$Node = props => {
  const [emojiOpacity, setEmojiOpacity] = useState(0.6);
  const [title, setTitle] = useState("");
  const { streamStatus, showTutorial } = props;

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
              allowFontScaling={false}
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
            {props.selectedEmoji === 0 ?
            (
              <Text style={styles.emptyCategoryText}>Category</Text>
            ): (
            <LinearGradient
              colors={Object.values(AppTags[props.selectedEmoji].color)}
              start={{x: 1, y: 0}}
              end={{x: 0, y: 1}}
              style={styles.emojiCategoryContainer}>
              <Text style={[styles.itemText, {textShadowColor: AppTags[props.selectedEmoji].shadowColor}]}>
                {AppTags[props.selectedEmoji].name}
              </Text>
            </LinearGradient>
            )}
          </Touchable>
        </View>
      ) : (
        <View style={styles.flexRow}>
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
          {props.boosting &&
          <View style={styles.boostContainer}>
            <IconButton
              backColor={"#D491FF"}
              icon={Images.app.icRocket}
              iconWidth={15}
              iconHeight={15}
              onPress={props.onBoost}
            />
          </View>}
          {showTutorial &&
          <View style={styles.tutorialContainer}>
            <Text style={styles.tutorialText}>Click to see who's here</Text>
            <Image source={Images.app.icRight} style={styles.tutorialArrow} />
          </View>}
          { !showTutorial && props.askedUsers.length > 0 &&
          <Touchable style={styles.raisedContainer}
          onPress={() => {
            props.showUsers && props.showUsers();
          }}>
            <Image source={Images.live.icHand} style={styles.raisedIcon} />
            <Text style={styles.raisedText}>{props.askedUsers.length}</Text>
          </Touchable> }
        </View>
      )}
    </View>
  );
};

export default StreamHeader;

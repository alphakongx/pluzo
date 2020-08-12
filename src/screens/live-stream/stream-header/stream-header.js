import React, { useState } from "react";
import { View, TextInput as RNTextInput } from "react-native";
import { Touchable, Image, UserCount } from "@components";
import { StreamStatus } from "@constants";
import Images from "@assets/Images";

import styles from "./stream-header.style";

const StreamHeader: () => React$Node = props => {
  const { streamStatus } = props;
  
  const goBack = () => {
    props.navigation && props.navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Touchable style={styles.backButton} onPress={goBack}>
        <Image source={Images.app.icBack} style={styles.backImage} />
      </Touchable>

      {
        streamStatus === StreamStatus.STARTING ? (
          <View style={styles.titleContainer}>
            <RNTextInput 
              style={styles.titleText}
              multiline={false}
              placeholder={"Set a title"}
              placeholderTextColor={"white"} />
          </View>
        ) : (
          <Touchable onPress={() => {
            props.showUsers && props.showUsers();
          }}>
            <UserCount
              style={styles.userCountStyle}
              textStyle={styles.userTextStyle}
              count={1}
            />
          </Touchable>
        )
      }
    </View>
  );
};

export default StreamHeader;

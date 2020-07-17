import React from "react";
import { View } from "react-native";
import { Image, Text, Touchable } from "@components";
import styles from "./search-chat-item.style";

const SearchChatItem: () => React$Node = props => {
  return (
    <Touchable onPress={props.onPressItem}>
      <View style={styles.messageContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require("@assets/images/message-image.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.messageContentContainer}>
          <Text style={styles.subject}>Lara Cruse</Text>
          <Text style={styles.preview}>Hey, so do we see each other? ...</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>23min</Text>
          <View style={styles.unread} />
        </View>
      </View>
      <View style={styles.separator} />
    </Touchable>
  );
};

export default SearchChatItem;

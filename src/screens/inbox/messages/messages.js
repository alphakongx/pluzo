import React from "react";
import { FlatList, Image, View } from "react-native";
import { Text } from "@components";
import data from "./messages.json";
import styles from "./messages.style";

const Messages: () => React$Node = props => {
  return (
    <FlatList
      style={styles.container}
      data={data}
      renderItem={() => (
        <View style={styles.messageContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={require("@assets/images/message-image.png")}
              style={styles.image}
            />
          </View>
          <View style={styles.messageContentContainer}>
            <Text style={styles.subject}>Lara Cruse</Text>
            <Text style={styles.preview}>Hey, so do we see each other tomorrow?</Text>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.time}>23min</Text>
            <View style={styles.unread} />
          </View>
        </View>
      )}
    />
  );
};

export default Messages;
import React from "react";
import { FlatList, Image, View, ActivityIndicator } from "react-native";
import { Text, Touchable } from "@components";
import styles from "./messages.style";

class Messages extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.requestChannels(this.props.token);
  }

  render() {
    const { isLoadingChannels, channels } = this.props;
    if (isLoadingChannels) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={"large"} color={"white"} />
        </View>
      );
    }

    return (
      <FlatList
        style={styles.container}
        data={channels}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={() => (
          <Touchable onPress={this.props.onPressItem}>
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
          </Touchable>
        )}
      />
    );
  }
}

export default Messages;

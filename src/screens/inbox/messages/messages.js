import React from "react";
import { FlatList, Image, View, ActivityIndicator } from "react-native";
import moment from "moment";
import { Text, Touchable } from "@components";
import styles from "./messages.style";

class Messages extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("willFocus", () => {
      this.props.requestChannels(this.props.token);
    });
  }

  componentWillUnmount() {
    this._unsubscribe;
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
        keyExtractor={item => `room-${item.chat_id}`}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item: channel, index }) => {
          let createdTime =
            channel.messages[0].created_at || channel.messages[0].createdAt;
          let timeAgo = moment.unix(createdTime).fromNow(true);
          let partner = channel.partner_info;
          let image = partner.image || partner.avatar;
          let name = partner.first_name === null ? "No Name" : partner.first_name;
          let isRead = channel.messages[0].status === 1;

          return (
            <Touchable
              onPress={() => {
                this.props.onPressItem(channel.chat_id, channel.partner_info);
              }}
              key={channel.chat_id}
            >
              <View style={styles.messageContainer}>
                <View style={styles.imageContainer}>
                  <Image
                    source={
                      image === null
                        ? require("@assets/images/message-image.png")
                        : { uri: image }
                    }
                    style={styles.image}
                  />
                </View>
                <View style={styles.messageContentContainer}>
                  <Text style={styles.subject}>{name}</Text>
                  <Text style={styles.preview} lines={1}>
                    {channel.messages[0].text}
                  </Text>
                </View>
                <View style={styles.timeContainer}>
                  <Text style={styles.time}>{timeAgo}</Text>
                  {isRead && <View style={styles.unread} />}
                </View>
              </View>
            </Touchable>
          );
        }}
      />
    );
  }
}

export default Messages;

import React from "react";
import { FlatList, View, ActivityIndicator } from "react-native";
import EventBus from "eventing-bus";
import moment from "moment";
import { Text, Touchable } from "@components";
import styles from "./messages.style";
import FastImage from "react-native-fast-image";

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstLoading: true,
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("willFocus", () => {
      this.props.requestChannels(this.props.token);
    });
    this.actionNewMessage = EventBus.on("NEW_MSG", messages => {
      if (this.props.isFocused === true) {
        this.props.requestChannels(this.props.token);
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isLoadingChannels === true && prevState.firstLoading === true) {
      this.onFinishedLoading();
    }
  }

  componentWillUnmount() {
    this._unsubscribe;
    this.actionNewMessage();
  }

  onFinishedLoading = () => {
    this.setState({ firstLoading: false });
  };

  render() {
    const { isLoadingChannels, channels } = this.props;
    let chatChannels = channels.filter(channel => channel.partner_info !== null);
    const { firstLoading } = this.state;
    if (isLoadingChannels && firstLoading === true) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={"large"} color={"white"} />
        </View>
      );
    }

    return (
      <FlatList
        style={styles.container}
        data={chatChannels}
        keyExtractor={item => `room-${item.chat_id}`}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item: channel, index }) => {
          let createdTime =
            channel.messages[0].created_at || channel.messages[0].createdAt;
          let timeAgo = moment.unix(createdTime).fromNow(true);
          let partner = channel.partner_info;
          let image = require("@assets/images/app-icon.png");
          let name = "Pluzo Team";
          if (typeof partner === "object") {
            image = partner.images.length > 0 ? partner.images[0].path : null;
            name = partner.first_name === null ? "No Name" : partner.first_name;
          }
          let isRead = channel.messages[0].status === 1;

          return (
            <Touchable
              onPress={() => {
                this.props.onPressItem(
                  channel.chat_id,
                  partner === "Pluzo Team" ? 0 : partner,
                );
              }}
              key={channel.chat_id}
            >
              <View style={styles.messageContainer}>
                <View style={styles.imageContainer}>
                  <FastImage
                    source={
                      image === null
                        ? require("@assets/images/message-image.png")
                        : typeof image === "string"
                        ? { uri: image }
                        : image
                    }
                    style={styles.image}
                  />
                </View>
                <View style={styles.messageContentContainer}>
                  <Text style={styles.subject}>{name}</Text>
                  <Text
                    style={[styles.preview, isRead ? {} : styles.previewNew]}
                    lines={1}
                  >
                    {channel.messages[0].user._id !== partner._id && "You: "}
                    {channel.messages[0].text}
                  </Text>
                </View>
                <View style={styles.timeContainer}>
                  <Text style={styles.time}>{timeAgo}</Text>
                  {channel.messages[0].user._id === partner._id && !isRead && (
                    <View style={styles.unread} />
                  )}
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

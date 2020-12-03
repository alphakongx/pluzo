import React, { Component } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  Animated,
  Easing,
  TextInput as RNTextInput,
} from "react-native";
import {
  Image,
  Touchable,
  Text,
  SolidButton,
  Screen,
  IconButton,
  BoxShadow,
} from "@components";
import LinearGradient from "react-native-linear-gradient";
import { Switch } from "react-native-switch";
import { Notification, widthPercentageToDP as wp } from "@helpers";
import { GRADIENT, AppBadges } from "@config";
import Images from "@assets/Images";

import styles from "./stream-users.style";
import StreamUserIcon from "../stream-user-icon/stream-user-icon";
import StreamCategoryModal from "../stream-category-modal";

class StreamUsers extends Component {
  constructor(props) {
    super(props);
    const { streamParams } = this.props;
    let names = streamParams.channelName.split("-");
    let creator = 0;
    if (names.length > 1) {
      creator = parseInt(names[1], 10);
    }
    this.state = {
      creator,
      visibleCategories: false,
      streamName: this.props.stream === null ? "" : this.props.stream.name,
      inviteOnly:
        this.props.stream === null || this.props.stream.invite_only === null
          ? false
          : parseInt(this.props.stream.invite_only, 10) === 0
          ? false
          : true,
    };

    this.slideAnim = new Animated.Value(250);
  }

  componentDidMount() {
    Animated.timing(this.slideAnim, {
      toValue: 0,
      duration: 250,
      easing: Easing.in(Easing.ease),
      useNativeDriver: false,
    }).start();
  }

  componentWillUnmount() {
    this.props.setIsScrolling(false);
    this.props.updateStream(this.props.stream, this.props.token);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.stream === null && this.props.stream !== null) {
      this.onUpdateStates();
    }
  }

  onUpdateStates = () => {
    this.setState({ streamName: this.props.stream.name });
    this.setState({
      inviteOnly:
        this.props.stream.invite_only === null
          ? false
          : parseInt(this.props.stream.invite_only, 10) === 0
          ? false
          : true,
    });
  };

  onRemoveBroadcaster = broadcaster => {
    const { streamParams } = this.props;
    if (broadcaster._id === this.state.creator) {
      if (this.props.user.id !== broadcaster._id) {
        Notification.alert("The creator cannot disconnect");
        return;
      }
    }
    this.props.requestStreamDisconnectBroad(
      streamParams.channelName,
      broadcaster._id,
      this.props.token,
    );
  };

  onAddToBroadcaster = audience => {
    const { streamParams } = this.props;
    this.props.requestStreamAskJoin(
      streamParams.channelName,
      audience._id,
      this.props.token,
    );
    const { audiences } = this.props;
    let newAudiences = [];
    audiences.forEach((user, index) => {
      if (user._id === audience._id) {
        user.sendRequest = true;
      }
      newAudiences.push(user);
    });
    this.props.updateAudiences(newAudiences);
  };

  isSendRequest = user => {
    return !(user.sendRequest === undefined || user.sendRequest === false);
  };

  onChangeTitle = text => {
    this.setState({ streamName: text });
    let stream = this.props.stream;
    stream.name = text;
    this.props.streamUpdateSuccess(stream);
  };

  onChangeTitleUpdate = () => {
    this.props.updateStream(this.props.stream, this.props.token);
  };

  onInviteOnlyChanged = val => {
    this.setState({ inviteOnly: val });
    let stream = this.props.stream;
    stream.invite_only = val ? "1" : "0";
    this.props.updateStream(stream, this.props.token);
  };

  render() {
    const { broadcasters, audiences, isBroadcaster, stream } = this.props;

    return (
      <Animated.View
        style={[styles.container, { transform: [{ translateX: this.slideAnim }] }]}
      >
        <Screen
          hasGradient
          style={[
            styles.safeAreaContainer,
            {
              paddingTop: this.props.insets.top,
              paddingBottom: this.props.insets.bottom,
            },
          ]}
        >
          <SafeAreaView style={styles.flexFill}>
            <View style={styles.header}>
              <Touchable
                style={styles.headerButtonTouchable}
                onPress={this.props.onReport}
              >
                <Image source={require("@assets/images/report.png")} />
              </Touchable>
              {isBroadcaster && stream !== null ? (
                <Touchable
                  onPress={() => {
                    this.setState({ visibleCategories: true });
                  }}
                  style={[styles.emojiButton]}
                >
                  <Image source={Images.live[AppBadges[stream.category].icon]} />
                </Touchable>
              ) : (
                <View style={styles.headerTitleContainer}>
                  <Text style={styles.headerTitle}>{"Live"}</Text>
                  <View style={styles.onlineIconContainer}>
                    <LinearGradient
                      colors={GRADIENT.FRIEND_ONLINE_ICON}
                      from={{ x: 0, y: 0 }}
                      to={{ x: 1, y: 0 }}
                      style={styles.onlineIcon}
                    />
                  </View>
                </View>
              )}
            </View>

            {isBroadcaster && stream !== null && (
              <RNTextInput
                value={this.state.streamName}
                style={styles.streamTitle}
                placeholder={"Set a title"}
                placeholderTextColor={"#E8E6FF"}
                onChangeText={text => this.onChangeTitle(text)}
                onEndEditing={() => this.onChangeTitleUpdate()}
                autoCorrect={false}
                allowFontScaling={false}
              />
            )}

            {isBroadcaster && stream !== null && (
              <View style={styles.inviteOnlyContainer}>
                <View>
                  <Text style={styles.inviteOnlyText}>Invite-Only</Text>
                  <Text style={styles.inviteOnlySubtext}>
                    Only people you invite can join
                  </Text>
                </View>
                <Switch
                  value={this.state.inviteOnly}
                  onValueChange={val => this.onInviteOnlyChanged(val)}
                  circleSize={20}
                  barHeight={24}
                  circleBorderWidth={0}
                  backgroundActive={"#617FFF"}
                  backgroundInactive={"#ABA7D5"}
                  circleActiveColor={"white"}
                  circleInActiveColor={"white"}
                  renderActiveText={false}
                  renderInActiveText={false}
                  switchBorderRadius={12}
                  switchWidthMultiplier={2.2}
                />
              </View>
            )}
            {isBroadcaster && <View style={styles.separator} />}

            <View style={styles.inviteButtonContainer}>
              <SolidButton
                text={"+ Invite friends"}
                onPress={this.props.onInviteFriends}
              />
            </View>

            <ScrollView style={styles.scrollView}>
              {/** stream users */}
              <View style={styles.flexRow}>
                <View style={styles.streamerMark} />
                <Text
                  style={styles.streamerText}
                >{`${broadcasters.length} Streamer`}</Text>
              </View>
              {broadcasters.map((user, index) => {
                return (
                  <View key={"stream" + user._id} style={styles.userContainer}>
                    <StreamUserIcon
                      user={user}
                      onImagePress={() => this.props.onShowProfile(user)}
                    />
                    <View style={styles.nameTextContainer}>
                      <View style={styles.nameContainer}>
                        <Text style={styles.nameText}>{user.first_name}</Text>
                        {user.badges.map(badge => {
                          if (badge > AppBadges.length) return null;
                          return (
                            <Image
                              key={`profile-badge-${badge}`}
                              source={Images.live[AppBadges[badge].icon]}
                              style={styles.badgeImage}
                            />
                          );
                        })}
                      </View>
                      <Text style={styles.usernameText}>
                        {user.name || user.username}
                      </Text>
                    </View>
                    {isBroadcaster && this.state.creator !== user._id && (
                      <Touchable onPress={() => this.onRemoveBroadcaster(user)}>
                        <Image source={Images.live.broadcasterRemove} />
                      </Touchable>
                    )}
                  </View>
                );
              })}

              {/** viewers */}
              <View style={styles.flexRow}>
                <Image source={Images.live.icEye} />
                <Text style={styles.streamerText}>{`${audiences.length} Viewer`}</Text>
              </View>
              {audiences.map((user, index) => {
                return (
                  <View key={"viewer" + user.id} style={styles.userContainer}>
                    <StreamUserIcon
                      isStreamer={false}
                      user={user}
                      onImagePress={() => this.props.onShowProfile(user)}
                    />
                    <View style={styles.nameTextContainer}>
                      <View style={styles.nameContainer}>
                        <Text style={styles.nameText}>{user.first_name}</Text>
                        {user.badges.map(badge => {
                          if (badge > AppBadges.length) return null;
                          return (
                            <Image
                              key={`profile-badge-${badge}`}
                              source={Images.live[AppBadges[badge].icon]}
                              style={styles.badgeImage}
                            />
                          );
                        })}
                      </View>
                      <Text style={styles.usernameText}>
                        {user.name || user.username}
                      </Text>
                    </View>
                    {isBroadcaster && (
                      <Touchable
                        disabled={this.isSendRequest(user)}
                        onPress={() => this.onAddToBroadcaster(user)}
                      >
                        {!this.isSendRequest(user) ? (
                          <Image source={Images.live.broadcasterAdd} />
                        ) : (
                          <Image source={Images.live.broadcasterWait} />
                        )}
                      </Touchable>
                    )}
                  </View>
                );
              })}
            </ScrollView>

            <View style={styles.boostContainer}>
              <BoxShadow
                setting={{
                  width: wp(60),
                  height: wp(60),
                  color: "#6E00FF",
                  opacity: 0.6,
                  _borderRadius: wp(30),
                  spread: 0,
                  blur: 10,
                  offsetX: 0,
                  offsetY: 0,
                }}
              />
              <IconButton
                backColor={"#D491FF"}
                icon={Images.app.icRocket}
                iconWidth={27}
                iconHeight={27}
              />
            </View>
          </SafeAreaView>

          {stream !== null && (
            <StreamCategoryModal
              isVisible={this.state.visibleCategories}
              onDismiss={() => this.setState({ visibleCategories: false })}
            />
          )}
        </Screen>
      </Animated.View>
    );
  }
}

export default StreamUsers;

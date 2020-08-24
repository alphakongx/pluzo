import React, { Component } from "react";
import { View, SafeAreaView } from "react-native";
import {} from "react-navigation";
import {
  Screen,
  Masonry,
  VerticalImagesLayout,
  Text,
  Image,
  Touchable,
  BoxShadow,
} from "@components";
import LinearGradient from "react-native-linear-gradient";
// import Swiper from "react-native-swiper";
import EventBus from "eventing-bus";
import { GRADIENT } from "@config";

import { LiveTypes } from "@redux/actions";
import Images from "@assets/Images";
import Header from "./header/header.js";
import LiveTags from "./live-tags/live-tags.js";
// import LiveSwiperItem from "./live-swiper-item/index.js";

import styles from "./live.style.js";

const appBadges = require("@config/data/badges.json");

class Live extends Component {
  constructor() {
    super();
    this.masonryRef = React.createRef();
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("willFocus", () => {
      this.props.requestStreamList(this.props.token);
    });
    this.updateActionSubscription = EventBus.on(
      LiveTypes.STREAM_LIST_SUCCESS,
      this.updateStreamList,
    );
  }

  componentWillUnmount() {
    this._unsubscribe;
    this.updateActionSubscription();
  }

  updateStreamList = () => {
    console.log("Updated stream >>>", this.props.allStreams);
    this.masonryRef.clearAll();
    this.masonryRef.addItems(this.props.allStreams);
  };

  onNewStream = () => {
    const { user } = this.props;
    let channelName = `channel-${user.id}`;
    let params = {
      channelName,
      isBroadcaster: true,
      isJoin: false,
    };
    EventBus.publish("NEW_STREAM_ACTION", params);
  };

  renderLiveItem = item => {
    return (
      <Touchable
        style={styles.itemContainer}
        key={"session" + item.id}
        onPress={() => {
          let channelName = item.channel;
          let params = {
            channelName,
            isBroadcaster: false,
            isJoin: true,
          };
          EventBus.publish("NEW_STREAM_ACTION", params);
        }}
      >
        <VerticalImagesLayout images={item.user.images} />
        <View style={styles.itemDataContainer}>
          <Text style={styles.userName} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.tagContainer}>
            <LinearGradient
              colors={GRADIENT.BUTTON}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.membersContainer}
            >
              <Image
                source={require("@assets/images/live-screen/live-user.png")}
                style={styles.memberIcon}
              />
              <Text style={styles.memberCount}>{parseInt(item.count, 10) + 1}</Text>
            </LinearGradient>
            <View style={styles.tagImages}>
              {item.user.badges.map(badge => {
                return (
                  <Image
                    key={`badge-${badge}`}
                    source={Images.live[appBadges[badge].icon]}
                    style={styles.tagImage}
                  />
                );
              })}
            </View>
          </View>
        </View>
      </Touchable>
    );
  };

  render() {
    return (
      <Screen hasGradient style={styles.container}>
        <SafeAreaView style={styles.safeAreaContainer}>
          <View style={styles.contentContainer}>
            <Masonry
              sorted
              keyboardShouldPersistTaps={"always"}
              ref={ref => (this.masonryRef = ref)}
              header={
                <View>
                  <Header />
                  <View style={styles.separator} />
                  <LiveTags />

                  {/* <Swiper
                    style={styles.swiperContainer}
                    containerStyle={styles.swiperWrapper}
                    showsButtons={false}
                    loop={false}
                    dot={<View style={styles.swiperDot} />}
                    activeDot={
                      <LinearGradient
                        colors={["#617FFF", "#02FFF3"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.swiperActiveDot}
                      />
                    }
                    paginationStyle={styles.swiperPagenation}
                  >
                    <LiveSwiperItem key={"1"} />
                    <LiveSwiperItem key={"2"} />
                    <LiveSwiperItem key={"3"} />
                    <LiveSwiperItem key={"4"} />
                    <LiveSwiperItem key={"5"} />
                  </Swiper> */}
                </View>
              }
              renderItem={item => this.renderLiveItem(item)}
              containerStyle={styles.masonryContainer}
            />

            <Touchable style={styles.favContainer} onPress={this.onNewStream}>
              <BoxShadow
                setting={{
                  width: 60,
                  height: 60,
                  color: "#1900FF",
                  opacity: 0.38,
                  _borderRadius: 30,
                  spread: 0,
                  blur: 10,
                  offsetX: 0,
                  offsetY: 0,
                }}
              />
              <LinearGradient
                colors={GRADIENT.BUTTON}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.plusFav}
              >
                <Image source={require("@assets/images/live-screen/plus-fav.png")} />
              </LinearGradient>
            </Touchable>
          </View>
        </SafeAreaView>
      </Screen>
    );
  }
}

export default Live;

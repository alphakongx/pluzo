import React, { Component } from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
import {} from "react-navigation";
import {
  Screen,
  Image,
  Touchable,
  BoxShadow,
} from "@components";
import RNMasonryScroll from "react-native-masonry-scrollview";
import * as Animatable from "react-native-animatable";
import LinearGradient from "react-native-linear-gradient";
import Swiper from "react-native-swiper";
import EventBus from "eventing-bus";
import { widthPercentageToDP as wp } from "@helpers";
import { GRADIENT } from "@config";
import { StreamStatus } from "@constants";

import { LiveTypes } from "@redux/actions";
import Images from "@assets/Images";
import Header from "./header/header.js";
import LiveTags from "./live-tags/live-tags.js";
import LiveSwiperItem from "./live-swiper-item/index.js";
import LiveItem from "./live-item";

import styles from "./live.style.js";

const { createAnimatableComponent } = Animatable;
const AnimatableView = createAnimatableComponent(View);

class Live extends Component {
  constructor() {
    super();
    this.state = {
      category: 0,
      livePosition: {},
    };
  }

  componentDidMount() {
    this.props.requestStreamList(this.props.token);

    this.updateActionSubscription = EventBus.on(
      LiveTypes.STREAM_LIST_SUCCESS,
      this.updateStreamList,
    );
    this.updateActionStreams = EventBus.on("Start_update", () => {
      this.props.requestStreamList(this.props.token);
    });
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
    this.updateActionSubscription();
    this.updateActionStreams();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.category !== this.state.category) {
      this.updateStreamList();
    }
  }

  updateStreamList = () => {
    setTimeout(() => {
      if (this.updateInterval === undefined) {
        this.updateInterval = setInterval(() => {
          this.props.requestStreamList(this.props.token);
        }, 5000);
      }
    }, 500);
  };

  onNewStream = () => {
    const { user } = this.props;
    if (this.props.streamStatus !== StreamStatus.NONE) {
      EventBus.publish("APP_END_STREAM_ACTION");
      setTimeout(() => {
        let channelName = `${new Date().getTime()}-${user.id}`;
        let params = {
          channelName,
          isBroadcaster: true,
          isJoin: false,
        };
        EventBus.publish("NEW_STREAM_ACTION", params);
      }, 200);
    } else {
      let channelName = `${new Date().getTime()}-${user.id}`;
      let params = {
        channelName,
        isBroadcaster: true,
        isJoin: false,
      };
      EventBus.publish("NEW_STREAM_ACTION", params);
    }
  };

  onJoinStream = channelName => {
    let names = channelName.split("-");
    if (names.length > 1 && parseInt(names[1], 10) === this.props.user.id) {
      return;
    }
    if (this.props.streamStatus !== StreamStatus.NONE) {
      EventBus.publish("APP_END_STREAM_ACTION");
      setTimeout(() => {
        let params = {
          channelName,
          isBroadcaster: false,
          isJoin: true,
        };
        EventBus.publish("NEW_STREAM_ACTION", params);
      }, 500);
    } else {
      let params = {
        channelName,
        isBroadcaster: false,
        isJoin: true,
      };
      EventBus.publish("NEW_STREAM_ACTION", params);
    }
  };

  renderStaticViews = () => {
    const { category } = this.state;
    let streams = this.props.trendingStreams;
    if (category !== 0) {
      streams = this.props.trendingStreams.filter(
        stream => parseInt(stream.category, 10) === this.state.category,
      );
    }
    return (
      <View>
        <Header navigation={this.props.navigation} />
        <View style={styles.separator} />
        <LiveTags onChangeCategory={value => this.setState({ category: value })} />

        {streams.length > 0 && (
          <Swiper
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
            {streams.map((stream, index) => {
              return (
                <LiveSwiperItem
                  key={`trending-live-${index}`}
                  item={stream}
                  onJoinStream={channelName => this.onJoinStream(channelName)}
                />
              );
            })}
          </Swiper>
        )}
      </View>
    );
  };

  renderLiveItem = (item, index) => {
    return (
      <AnimatableView
        animation={"fadeInUp"}
        delay={100 * index}
        key={"session" + item.id}
      >
        <Touchable
          style={styles.itemContainer}
          onPress={() => {
            this.onJoinStream(item.channel);
          }}
        >
          <LiveItem item={item}/>
        </Touchable>
      </AnimatableView>
    );
  };

  renderNewButton = () => {
    return (
      <Touchable
        style={styles.favContainer}
        disabled={this.props.streamStatus === StreamStatus.STARTED}
        onPress={this.onNewStream}
      >
        <BoxShadow
          setting={{
            width: wp(60),
            height: wp(60),
            color: this.props.streamStatus === StreamStatus.STARTED ? "#000" : "#1900FF",
            opacity: 0.38,
            _borderRadius: wp(30),
            spread: 0,
            blur: 10,
            offsetX: 0,
            offsetY: 0,
          }}
        />
        {this.props.streamStatus === StreamStatus.STARTED ? (
          <View style={[styles.plusFav, styles.favGray]}>
            <Image source={Images.app.icPlus} />
          </View>
        ) : (
          <LinearGradient
            colors={GRADIENT.BUTTON}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.plusFav}
          >
            <Image source={Images.app.icPlus} />
          </LinearGradient>
        )}
      </Touchable>
    );
  };

  render() {
    const { category } = this.state;
    let streams = this.props.allStreams;
    if (category !== 0) {
      streams = this.props.allStreams.filter(
        stream => parseInt(stream.category, 10) === this.state.category,
      );
    }
    return (
      <Screen hasGradient style={styles.container}>
        <SafeAreaView style={styles.safeAreaContainer}>
          <View style={styles.container}>
            <ScrollView
              style={styles.contentContainer}
              bounces={false}
              keyboardShouldPersistTaps={"always"}
            >
              {this.renderStaticViews()}
              <RNMasonryScroll style={styles.masonryContainer} bounces={false}>
                {streams.map((item, index) => {
                  return this.renderLiveItem(item, index);
                })}
              </RNMasonryScroll>
            </ScrollView>
            {this.renderNewButton()}
          </View>
        </SafeAreaView>
      </Screen>
    );
  }
}

export default Live;

import React, { Component } from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
import { NavigationEvents } from "react-navigation";
import { Screen, Image, Touchable, BoxShadow } from "@components";
import RNMasonryScroll from "react-native-masonry-scrollview";
import * as Animatable from "react-native-animatable";
import LinearGradient from "react-native-linear-gradient";
import Swiper from "react-native-swiper";
import EventBus from "eventing-bus";
import moment from "moment";
import { widthPercentageToDP as wp, getCurrentLocation } from "@helpers";
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
      searchText: "",
      clickedNew: false,
    };
    this.pageStartTime = 0;
  }

  componentDidMount() {
    this.props.requestStreamList(this.props.token);

    this.updateActionSubscription = EventBus.on(
      LiveTypes.STREAM_LIST_SUCCESS,
      this.updateStreamList,
    );
    this.updateActionStreams = EventBus.on("Start_update", jsonData => {
      this.props.requestStreamList(this.props.token);

      if (jsonData === undefined) return;
      let data = JSON.parse(jsonData);
      if (this.props.channelName === data.stream.channel) {
        this.props.updateStreamSuccess(data.stream);
        this.props.updateStreamInfo(
          data.stream.boost_end_time,
          parseInt(data.stream.invite_only, 10),
        );
      }
    });
    this._unsubscribe = this.props.navigation.addListener("willFocus", () => {
      getCurrentLocation(position => {
        if (position) {
          const params = new FormData();
          params.append("latitude", position.coords.latitude);
          params.append("longitude", position.coords.longitude);
          this.props.updateUser(params, this.props.token);
        }
      });
      this.updateStreamList();
    });
  }

  componentWillUnmount() {
    this._unsubscribe;
    clearInterval(this.updateInterval);
    this.updateActionSubscription();
    this.updateActionStreams();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.category !== this.state.category) {
      this.updateStreamList();
    }
  }

  onWillFocus = payload => {
    if (this.pageStartTime == 0) {
      this.pageStartTime = moment().unix();
    }
  };

  onWillBlur = payload => {
    if (payload.lastState.key !== payload.state.key) {
      const params = {
        timeStart: this.pageStartTime,
        timeEnd: moment().unix(),
        page: "Live",
      };
      this.pageStartTime = 0;
      this.props.requestPageTime(params, this.props.token);
    }
  };

  updateStreamList = () => {
    setTimeout(() => {
      if (this.updateInterval) {
        clearInterval(this.updateInterval);
      }
      this.updateInterval = setInterval(() => {
        this.props.requestStreamList(this.props.token);
      }, 30000);
    }, 500);
  };

  onNewStream = () => {
    this.setState({ clickedNew: true }, () => {
      setTimeout(() => {
        this.setState({ clickedNew: false });
      }, 500);
    });
    const { user } = this.props;
    let channelName = `${new Date().getTime()}-${user.id}`;
    let params = {
      channelName,
      isBroadcaster: true,
      isJoin: false,
    };
    if (
      this.props.streamStatus !== null &&
      this.props.streamStatus !== StreamStatus.NONE
    ) {
      EventBus.publish("APP_END_STREAM_ACTION", params);
    } else {
      EventBus.publish("NEW_STREAM_ACTION", params);
    }
  };

  onJoinStream = channelItem => {
    let channelName = channelItem.channel;
    let names = channelName.split("-");
    if (
      (names.length > 1 && parseInt(names[1], 10) === this.props.user.id) ||
      this.props.channelName === channelName
    ) {
      return;
    }

    if (
      channelItem.ban_list.filter(value => value.user_id === this.props.user.id).length >
      0
    ) {
      return;
    }

    let params = {
      channelName,
      isBroadcaster: false,
      isJoin: true,
    };
    if (this.props.streamStatus !== StreamStatus.NONE) {
      EventBus.publish("APP_END_STREAM_ACTION", params);
    } else {
      EventBus.publish("NEW_STREAM_ACTION", params);
    }
  };

  renderStaticViews = () => {
    const { category, searchText } = this.state;
    let streams = this.props.trendingStreams.filter(
      value => value.info.streamers_images.length > 0,
    );
    if (category !== 0) {
      streams = this.props.trendingStreams.filter(
        stream => parseInt(stream.category, 10) === category,
      );
    }
    if (searchText !== "") {
      streams = this.props.trendingStreams.filter(
        stream =>
          stream.name.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) > -1,
      );
    }
    return (
      <View>
        <Header
          navigation={this.props.navigation}
          onSearch={text => this.setState({ searchText: text })}
        />
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
                  onJoinStream={channelItem => this.onJoinStream(channelItem)}
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
            this.onJoinStream(item);
          }}
        >
          <LiveItem item={item} />
        </Touchable>
      </AnimatableView>
    );
  };

  renderNewButton = () => {
    return (
      <Touchable
        style={styles.favContainer}
        disabled={
          this.props.streamStatus === StreamStatus.STARTED || this.state.clickedNew
        }
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
        {this.props.streamStatus === StreamStatus.STARTED || this.state.clickedNew ? (
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
    const { category, searchText } = this.state;
    let streams = this.props.allStreams.filter(
      value => value.info.streamers_images.length > 0,
    );
    if (category !== 0) {
      streams = this.props.allStreams.filter(
        stream => parseInt(stream.category, 10) === this.state.category,
      );
    }
    if (searchText !== "") {
      streams = this.props.allStreams.filter(
        stream =>
          stream.name.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) > -1,
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

          <NavigationEvents
            onWillFocus={payload => this.onWillFocus(payload)}
            onWillBlur={payload => this.onWillBlur(payload)}
          />
        </SafeAreaView>
      </Screen>
    );
  }
}

export default Live;

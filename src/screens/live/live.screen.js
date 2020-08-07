import React, { Component } from "react";
import { View, SafeAreaView } from "react-native";
import {} from "react-navigation";
import { Masonry, VerticalImagesLayout, Text, Image, Touchable } from "@components";
import { SCREENS } from "@constants";
import LinearGradient from "react-native-linear-gradient";
import Swiper from "react-native-swiper";
import { GRADIENT } from "@config";

import Images from "@assets/Images";
import Header from "./header/header.js";
import LiveUsers from "./live-users";
import LiveTags from "./live-tags/live-tags.js";
import LiveSwiperItem from "./live-swiper-item/index.js";

import styles from "./live.style.js";

class Live extends Component {
  constructor() {
    super();
    this.masonryRef = React.createRef();
  }

  componentDidMount() {
    let image1 = require("@assets/images/live-screen/user-temp1.png");
    let image2 = require("@assets/images/live-screen/user-temp2.png");
    let image3 = require("@assets/images/live-screen/user-temp3.png");
    let image4 = require("@assets/images/live-screen/user-temp4.png");
    this.masonryRef.addItems([
      {
        key: "1",
        name: "Cool Kids #1",
        images: [image4, image2, image1, image3],
        members: 131,
      },
      {
        key: "2",
        name: "Random meetup XOOOOO",
        images: [image2, image3, image1, image4, image3, image1, image4],
        members: 772,
      },
      {
        key: "3",
        name: "Come in!! - Have funney",
        images: [image4, image3, image2],
        members: 2,
      },
      { key: "4", name: "Come in!! - Have funney", images: [image2], members: 11 },
      {
        key: "5",
        name: "Come in!! - Have funney",
        images: [image1, image2],
        members: 11,
      },
    ]);
  }

  onNewStream = () => {
    const { user } = this.props;
    let channelName = `channel-${user.id}`;
    this.props.navigation.navigate(SCREENS.LIVE_STREAM, {
      channelName,
      isBroadcaster: true,
    });
  };

  render() {
    return (
      <LinearGradient
        colors={GRADIENT.SCREEN_BACKGROUND}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeAreaContainer}>
          <View style={styles.contentContainer}>
            <Masonry
              sorted
              ref={ref => (this.masonryRef = ref)}
              header={
                <View>
                  <Header />
                  <LiveUsers />
                  <View style={styles.separator} />
                  <LiveTags />

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
                    <LiveSwiperItem key={"1"} />
                    <LiveSwiperItem key={"2"} />
                    <LiveSwiperItem key={"3"} />
                    <LiveSwiperItem key={"4"} />
                    <LiveSwiperItem key={"5"} />
                  </Swiper>
                </View>
              }
              renderItem={item => (
                <Touchable
                  style={styles.itemContainer}
                  key={"session" + item.key}
                  onPress={() => {
                    this.props.navigation.navigate(SCREENS.LIVE_STREAM, {
                      channelName: "channel-xx",
                      isBroadcaster: false,
                    });
                  }}
                >
                  <VerticalImagesLayout images={item.images} />
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
                        <Text style={styles.memberCount}>{item.members}</Text>
                      </LinearGradient>
                      <View style={styles.tagImages}>
                        <Image source={Images.live.tagMusic} style={styles.tagImage} />
                        <Image source={Images.live.tagTravel} style={styles.tagImage} />
                      </View>
                    </View>
                  </View>
                </Touchable>
              )}
              containerStyle={styles.masonryContainer}
            />

            <Touchable style={styles.favContainer} onPress={this.onNewStream}>
              <LinearGradient
                colors={GRADIENT.BUTTON}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.plusFav}
              >
                <Image source={require("@assets/images/live-screen/plus-fav.png")} />
              </LinearGradient>
            </Touchable>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

export default Live;

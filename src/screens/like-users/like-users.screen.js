import React, { Component } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import {
  Screen,
  BackButton,
  Image,
  Text,
  AnimatedButton,
  Touchable,
  BoostConfirmModal,
} from "@components";
import moment from "moment";
import { SCREENS } from "@constants";
import { getLikedUsers } from "@redux/api";
import Images from "@assets/Images";
import LikedUserItem from "./liked-user-item";
import PluzoLikeSwiper from "./pluzo-like-swiper";
import SwipePurchaseModal from "../swipe/swipe-purchase-modal";
import BoostTimeModal from "../swipe/boost-time-modal";

import styles from "./like-users.style";

class LikeUsersScreen extends Component {
  constructor(props) {
    super(...arguments);
    this.state = {
      likedUsers: [],
      scrollEnabled: true,
      visibleBoost: false,
      visibleRemainingBoost: false,
      visibleBoostConfirm: false,
    };

    this.boosting = false;
    this.restSeconds = 0;
    this.boostInterval = null;
  }

  componentDidMount() {
    getLikedUsers(this.props.token).then(response => {
      this.setState({ likedUsers: response.data.data });
    });
    this.checkingBoostTime();
  }

  componentWillUnmount() {
    clearInterval(this.boostInterval);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.user.advanced.last_boost_time.boost_swipe_remaining_time !==
      this.props.user.advanced.last_boost_time.boost_swipe_remaining_time
    ) {
      this.checkingBoostTime();
    }
  }

  checkingBoostTime = () => {
    let boostTime = parseInt(
      this.props.user.advanced.last_boost_time.boost_swipe_remaining_time,
      10,
    ); //end_boost_swipe_time;
    if (boostTime > 0) {
      clearInterval(this.boostInterval);
      let duration = boostTime; //moment.unix(boostTime).diff(moment(), "seconds");
      if (duration > 0) {
        this.boosting = true;
        this.restSeconds = duration;
        this.boostInterval = setInterval(() => {
          if (this.restSeconds < 0) {
            clearInterval(this.boostInterval);
            this.boosting = false;
          } else {
            this.restSeconds -= 1;
          }
        }, 1000);
      } else {
        this.boosting = false;
      }
    } else {
      clearInterval(this.boostInterval);
      this.boosting = false;
    }
  };

  onBoost = (boost, confirmed) => {
    if (boost) {
      this.setState({ visibleRemainingBoost: true });
      return;
    }
    const { user } = this.props;
    let boostsCount = parseInt(user.advanced.boosts, 10);
    if (boostsCount > 0) {
      if (confirmed) {
        this.props.runBoost(this.props.token, 1, null);
      } else {
        this.setState({ visibleBoostConfirm: true });
      }
    } else {
      this.setState({ visibleBoost: true });
    }
  };

  onSwipedWithDirection = (eventIndex, type) => {
    const { token } = this.props;
    const { likedUsers } = this.state;

    let eventedUserId = likedUsers[eventIndex].user._id;
    this.setState({
      likedUsers: likedUsers.filter((value, index) => index !== eventIndex),
    });

    if (type === "left") {
      this.props.addDisLike(token, eventedUserId);
    } else if (type === "right") {
      this.props.addLike(token, eventedUserId, false);
    }
  };

  render() {
    const { likedUsers, scrollEnabled } = this.state;
    return (
      <Screen hasGradient style={styles.container}>
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <BackButton onPress={() => this.props.navigation.goBack()} />
              <View style={styles.headerTitleContainer} pointerEvents={"none"}>
                <Image
                  source={require("@assets/images/heart.png")}
                  style={styles.headerIcon}
                />
                <Text style={styles.headerText}>{`${likedUsers.length} Likes`}</Text>
              </View>
            </View>

            <ScrollView
              scrollEnabled={scrollEnabled && likedUsers.length !== 0}
              style={[
                styles.listContainer,
                { overflow: scrollEnabled ? "hidden" : "visible" },
              ]}
              contentContainerStyle={likedUsers.length === 0 ? { flex: 1 } : {}}
            >
              {likedUsers.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>
                    {"You have no likes\nSwipe to meet more people!"}
                  </Text>
                </View>
              ) : (
                <View style={styles.listContentContainer}>
                  {likedUsers.map((likedUser, index) => {
                    if (this.props.user.premium === 0) {
                      return (
                        <Touchable
                          key={`like-users-${likedUser.user._id}`}
                          style={styles.itemContainer}
                          onPress={() => this.props.showPurchase(true)}
                        >
                          <LikedUserItem likedUser={{ user: likedUser.user }} />
                        </Touchable>
                      );
                    }
                    return (
                      <PluzoLikeSwiper
                        key={`like-users-${likedUser.user._id}`}
                        style={styles.itemContainer}
                        onDragStart={() => this.setState({ scrollEnabled: false })}
                        onDragEnd={() => this.setState({ scrollEnabled: true })}
                        onSwipedDirection={direction =>
                          this.onSwipedWithDirection(index, direction)
                        }
                        onPress={() => {
                          this.props.navigation.navigate(SCREENS.PROFILE_VIEW, {
                            user: likedUser.user,
                          });
                        }}
                      >
                        <LikedUserItem likedUser={{ user: likedUser.user }} />
                      </PluzoLikeSwiper>
                    );
                  })}
                </View>
              )}
            </ScrollView>

            {this.props.user.premium === 0 && (
              <View style={styles.buttonContainer}>
                <AnimatedButton
                  colors={["#FF7131", "#E0E552"]}
                  shadowColor={"#FF6F00"}
                  text={"Get Pluzo Plus"}
                  animImage={Images.swipe.pluzoPlusMark}
                  onPress={() => this.props.showPurchase(true)}
                />
              </View>
            )}
            {this.props.user.premium === 1 && (
              <View style={styles.buttonContainer}>
                <AnimatedButton
                  colors={["#9C3DE2", "#D491FF"]}
                  shadowColor={"#6E00FF"}
                  text={"Boost me"}
                  icon={Images.app.icRocket}
                  containerStyle={styles.flexRow}
                  iconStyle={styles.boostIcon}
                  onPress={() => this.onBoost(this.boosting, false)}
                  loading={this.props.isBoosting}
                />
              </View>
            )}
          </View>

          <SwipePurchaseModal
            isVisible={this.state.visibleBoost}
            uptoLogo
            purchaseType={"boost"}
            onConfirm={() => this.setState({ visibleBoost: false })}
            onPluzoPlus={() => this.setState({ visibleBoost: false })}
            onHide={() => this.setState({ visibleBoost: false })}
          />

          <BoostTimeModal
            isVisible={this.state.visibleRemainingBoost}
            onBack={() => this.setState({ visibleRemainingBoost: false })}
            onBoost={() => {
              this.setState({ visibleRemainingBoost: false });
              setTimeout(() => {
                this.onBoost(false, true);
              }, 500);
            }}
            isSwipe={true}
          />

          <BoostConfirmModal
            isVisible={this.state.visibleBoostConfirm}
            title={"Boost your profile"}
            content={"Keep swiping for the best results."}
            onBack={() => this.setState({ visibleBoostConfirm: false })}
            onBoost={() => {
              this.props.runBoost(this.props.token, 1, null);
              this.setState({ visibleBoostConfirm: false });
            }}
          />
        </SafeAreaView>
      </Screen>
    );
  }
}

export default LikeUsersScreen;

import React from "react";
import { View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Image, ProgressBar, Text } from "@components";
import LinearGradient from "react-native-linear-gradient";
import Swiper from "react-native-deck-swiper";
import ProfileDetails from "./profile-details";
import { GRADIENT } from "@config";
import { Notification } from "@helpers";

import styles from "./swipe.style";
import Header from "./header";
import ActionButtonsView from "./action-buttons-view";

class Swipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetail: false,
      cardIndex: 0,
      likeCount: 0,
    };

    this.swiper = React.createRef();
  }

  componentDidMount() {
    this.props.loadCards(this.props.token);
  }

  changeShowDetail = show => {
    this.setState({ showDetail: show });
  };

  onLikeClicked = () => {
    this.swiper.swipeRight(false);
  };

  onDisLikeClicked = () => {
    this.swiper.swipeLeft(false);
  };

  onSuperLikeClicked = () => {
    if (this.props.user.premium === 1) {
      this.swiper.swipeTop(false);
    } else {
      Notification.alert("Get Pluzo Plus");
    }
  };

  onRocketClicked = () => {
    if (this.props.user.premium === 1) {
      // this.props.addSuperLike(token, cards[index].id);
    } else {
      Notification.alert("Get Pluzo Plus");
    }
  };

  onReverseClicked = () => {
    this.props.loadCards(this.props.token);
  };

  onSwipedAllCards = () => {
    this.props.loadCards(this.props.token);
  };

  onSwiped = index => {
    if (index === this.props.cards.length - 1) {
      return;
    }
    this.setState({ cardIndex: index + 1 });
  };

  onSwipedWithDirection = (index, type) => {
    const { user, token, cards } = this.props;
    if (type === "left") {
      // dislike
      this.props.addDisLike(token, cards[index].id);
    } else if (type === "right") {
      // like
      // this.swiper.swipeBack();
      // Notification.alert("Get Pluzo Plus");
      this.props.addLike(token, cards[index].id);
    } else {
      // super like
      if (user.premium === 1) {
        this.props.addSuperLike(token, cards[index].id);
      } else {
        this.swiper.swipeBack();
        Notification.alert("Get Pluzo Plus");
      }
    }
  };

  render() {
    const { isLoadingCards, cards } = this.props;
    const { cardIndex, showDetail } = this.state;
    const placeholderImage = require("@assets/images/live-screen/user-temp3.png");

    if (isLoadingCards) {
      return (
        <LinearGradient
          colors={GRADIENT.SCREEN_BACKGROUND}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.emptyContainer}
        >
          <ActivityIndicator size={"large"} color={"white"} />
        </LinearGradient>
      );
    }

    if (cards === null || cards.length === 0) {
      return (
        <LinearGradient
          colors={GRADIENT.SCREEN_BACKGROUND}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.emptyContainer}
        >
          <Text style={styles.noUsers}>{"No more users"}</Text>
        </LinearGradient>
      );
    }

    return (
      <LinearGradient
        colors={GRADIENT.SCREEN_BACKGROUND}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.container}
      >
        <SafeAreaView style={styles.contentContainer}>
          <Swiper
            ref={swiper => {
              this.swiper = swiper;
            }}
            onSwiped={index => this.onSwiped(index)}
            onSwipedLeft={index => this.onSwipedWithDirection(index, "left")}
            onSwipedRight={index => this.onSwipedWithDirection(index, "right")}
            onSwipedTop={index => this.onSwipedWithDirection(index, "top")}
            onTapCard={this.swipeLeft}
            disableBottomSwipe={true}
            cards={cards}
            cardIndex={0}
            cardVerticalMargin={0}
            cardHorizontalMargin={0}
            backgroundColor={"transparent"}
            renderCard={(card, index) => {
              return (
                <View style={styles.card}>
                  <Image
                    resizeMode={"cover"}
                    source={card.image === null ? placeholderImage : { uri: card.image }}
                    style={styles.cardImage}
                  />
                </View>
              );
            }}
            onSwipedAll={this.onSwipedAllCards}
            stackSize={3}
            stackSeparation={15}
            overlayLabels={{
              left: {
                element: (
                  <Image
                    source={require("@assets/images/swipe-screen/swipe-cross.png")}
                    style={styles.heartIcon}
                  />
                ),
                style: {
                  wrapper: {
                    flexDirection: "column",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    marginLeft: -30,
                    marginTop: showDetail ? -60 : 0,
                  },
                },
              },
              right: {
                element: (
                  <Image
                    source={require("@assets/images/swipe-screen/swipe-heart.png")}
                    style={styles.heartIcon}
                  />
                ),
                style: {
                  wrapper: {
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    marginLeft: 30,
                    marginTop: showDetail ? -60 : 0,
                  },
                },
              },
              top: {
                title: "SUPER LIKE",
                style: {
                  label: {
                    backgroundColor: "black",
                    borderColor: "black",
                    color: "white",
                    borderWidth: 1,
                  },
                  wrapper: {
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                },
              },
            }}
            animateOverlayLabelsOpacity
            animateCardOpacity
            swipeBackCard
            showSecondCard={false}
          />

          <LinearGradient
            colors={GRADIENT.FADE}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.topActions}
          >
            <SafeAreaView>
              <ProgressBar />
              {!showDetail && (
                <Header item={cards[cardIndex]} onInfoClicked={this.changeShowDetail} />
              )}
            </SafeAreaView>
          </LinearGradient>
          {!showDetail && (
            <ActionButtonsView
              onLike={this.onLikeClicked}
              onDisLike={this.onDisLikeClicked}
              onSuperLike={this.onSuperLikeClicked}
              onRocket={this.onRocketClicked}
              onReload={this.onReverseClicked}
            />
          )}
          {showDetail && (
            <ProfileDetails
              item={cards[cardIndex]}
              hideDetail={() => {
                this.changeShowDetail(false);
              }}
              onLike={this.onLikeClicked}
              onDisLike={this.onDisLikeClicked}
              onSuperLike={this.onSuperLikeClicked}
            />
          )}
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

export default Swipe;

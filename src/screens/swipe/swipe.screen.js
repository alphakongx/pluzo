import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Screen, Image } from "@components";
import Swiper from "react-native-deck-swiper";
import EventBus from "eventing-bus";
import { getCurrentLocation } from "@helpers";
import { SwipeTypes } from "@redux/actions";
import Images from "@assets/Images";

import styles from "./swipe.style";

import ReportModal from "../report-modal";
import ActionButtonsView from "./action-buttons-view";
import Card from "./card";
import NoUsers from "./no-users";
import MatchesView from "./matches-view";
import SwipePurchaseModal from "./swipe-purchase-modal";

const LABEL_TYPES = {
  NONE: "none",
  LEFT: "left",
  RIGHT: "right",
  TOP: "top",
  BOTTOM: "bottom",
  REWIND: "rewind",
  BOOST: "boost",
};

class Swipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      cardIndex: 0,
      likeCount: 0,
      location: null,
      visibleBoost: false,
      visibleSuperlike: false,
      visibleRewind: false,
      visibleReport: false,
      labelType: LABEL_TYPES.NONE,
      matchedUser: null,
    };

    this.swiper = React.createRef();
  }

  componentDidMount() {
    this.props.loadCards(this.props.token);
    getCurrentLocation(position => {
      this.setState({ location: position });

      const params = new FormData();
      params.append("latitude", position.coords.latitude);
      params.append("longitude", position.coords.longitude);
      this.props.updateUser(params, this.props.token);
    });

    this.reloadAction = EventBus.on(SwipeTypes.REQUEST_SET_SETTINGS_SUCCESS, () => {
      console.log("RELOAD CARDS");
      this.props.loadCards(this.props.token);
    });

    this.matchesAction = EventBus.on("New_Matches", user => {
      this.setState({ matchedUser: user });
    });
  }

  componentWillUnmount() {
    this.reloadAction();
    this.matchesAction();
  }

  onLikeClicked = () => {
    this.setState({ labelType: LABEL_TYPES.RIGHT });
    this.swiper.swipeRight(false);
  };

  onDisLikeClicked = () => {
    this.setState({ labelType: LABEL_TYPES.LEFT });
    this.swiper.swipeLeft(false);
  };

  onSuperLikeClicked = () => {
    const { user } = this.props;
    let superLikesCount = parseInt(user.advanced.super_likes, 10);
    if (user.premium === 1 || superLikesCount > 0) {
      this.setState({ labelType: LABEL_TYPES.TOP });
      this.swiper.swipeTop(false);
    } else {
      this.setState({ visibleSuperlike: true });
    }
  };

  onRocketClicked = () => {
    const { user, token } = this.props;
    let boostsCount = parseInt(user.advanced.boosts, 10);
    if (user.premium === 1 || boostsCount > 0) {
      this.setState({ labelType: LABEL_TYPES.BOOST }, () => {
        setTimeout(() => {
          this.setState({ labelType: LABEL_TYPES.NONE });
        }, 350);
      });
      this.props.runBoost(token, 1);
    } else {
      this.setState({ visibleBoost: true });
    }
  };

  onRewindClicked = () => {
    const { user, token } = this.props;
    let rewindsCount = parseInt(user.advanced.reminds, 10);
    if (user.premium === 1 || rewindsCount > 0) {
      this.setState({ labelType: LABEL_TYPES.REWIND }, () => {
        setTimeout(() => {
          this.setState({ labelType: LABEL_TYPES.NONE });
        }, 350);
      });
      this.props.runRewinds(token);
    } else {
      this.setState({ visibleRewind: true });
    }
  };

  onSwipedAllCards = () => {
    setTimeout(() => {
      this.props.loadCards(this.props.token);
    }, 300);
  };

  onSwiped = index => {
    this.setState({ labelType: LABEL_TYPES.NONE });
    if (index === this.props.cards.length - 1) {
      return;
    }
    this.setState({ cardIndex: index + 1 });
  };

  onSwipedWithDirection = (index, type) => {
    const { token, cards } = this.props;
    if (type === "left") {
      // dislike
      this.props.addDisLike(token, cards[index].id);
    } else if (type === "right") {
      // like
      this.props.addLike(token, cards[index].id);
    } else {
      // super like
      // this.swiper.swipeBack();
      this.props.addSuperLike(token, cards[index].id);
    }
  };

  onSwiping = (animatedValueX, animatedValueY) => {
    let isSwipingLeft, isSwipingRight, isSwipingTop, isSwipingBottom;

    if (
      Math.abs(animatedValueX) > Math.abs(animatedValueY) &&
      Math.abs(animatedValueX) > 10
    ) {
      if (animatedValueX > 0) isSwipingRight = true;
      else isSwipingLeft = true;
    } else if (
      Math.abs(animatedValueY) > Math.abs(animatedValueX) &&
      Math.abs(animatedValueY) > 10
    ) {
      if (animatedValueY > 0) isSwipingBottom = true;
      else isSwipingTop = true;
    }

    if (isSwipingRight) {
      this.setState({ labelType: LABEL_TYPES.RIGHT });
    } else if (isSwipingLeft) {
      this.setState({ labelType: LABEL_TYPES.LEFT });
    } else if (isSwipingTop) {
      this.setState({ labelType: LABEL_TYPES.TOP });
    } else if (isSwipingBottom) {
      this.setState({ labelType: LABEL_TYPES.NONE });
    } else {
      this.setState({ labelType: LABEL_TYPES.NONE });
    }
  };

  render() {
    const { isLoadingCards, cards, visibleDetail } = this.props;
    const { labelType } = this.state;

    if (isLoadingCards || cards === null || cards.length === 0) {
      return (
        <Screen hasGradient style={styles.emptyContainer}>
          <NoUsers />
        </Screen>
      );
    }

    let overlayIcon = require("@assets/images/swipe-screen/swipe-star.png");
    if (labelType === LABEL_TYPES.RIGHT) {
      overlayIcon = require("@assets/images/swipe-screen/swipe-heart.png");
    } else if (labelType === LABEL_TYPES.LEFT) {
      overlayIcon = require("@assets/images/swipe-screen/swipe-cross.png");
    } else if (labelType === LABEL_TYPES.REWIND) {
      overlayIcon = require("@assets/images/swipe-screen/swipe-refresh.png");
    } else if (labelType === LABEL_TYPES.BOOST) {
      overlayIcon = require("@assets/images/swipe-screen/swipe-rocket.png");
    }

    return (
      <Screen hasGradient style={styles.container}>
        <SafeAreaView style={styles.contentContainer}>
          <Swiper
            ref={swiper => {
              this.swiper = swiper;
            }}
            onSwiped={index => this.onSwiped(index)}
            onSwipedLeft={index => this.onSwipedWithDirection(index, "left")}
            onSwipedRight={index => this.onSwipedWithDirection(index, "right")}
            onSwipedTop={index => this.onSwipedWithDirection(index, "top")}
            onSwiping={(x, y) => {
              this.onSwiping(x, y);
            }}
            disableTopSwipe={true}
            disableBottomSwipe={true}
            cards={cards}
            cardIndex={0}
            cardVerticalMargin={0}
            cardHorizontalMargin={0}
            backgroundColor={"transparent"}
            renderCard={(card, index) => {
              return (
                <Card
                  card={card}
                  onLike={this.onLikeClicked}
                  onDisLike={this.onDisLikeClicked}
                  onSuperLike={this.onSuperLikeClicked}
                  location={this.state.location}
                  onReport={() => this.setState({ visibleReport: true })}
                />
              );
            }}
            onSwipedAll={this.onSwipedAllCards}
            stackSize={3}
            stackSeparation={0}
            stackScale={0}
            overlayLabels={null}
            animateOverlayLabelsOpacity={false}
            animateCardOpacity
            swipeBackCard
            showSecondCard={true}
            dragEnd={() => {
              this.setState({ labelType: LABEL_TYPES.NONE });
            }}
          />

          {labelType !== LABEL_TYPES.NONE && (
            <Image source={overlayIcon} style={styles.heartIcon} />
          )}

          {!visibleDetail && (
            <ActionButtonsView
              onLike={this.onLikeClicked}
              onDisLike={this.onDisLikeClicked}
              onSuperLike={this.onSuperLikeClicked}
              onRocket={this.onRocketClicked}
              onReload={this.onRewindClicked}
            />
          )}

          {this.state.matchedUser !== null && (
            <View style={styles.matchesContainer}>
              <MatchesView
                matchedUser={this.state.matchedUser}
                onHide={() => this.setState({ matchedUser: null })}
              />
            </View>
          )}

          <SwipePurchaseModal
            isVisible={this.state.visibleBoost}
            uptoLogo
            purchaseType={"boost"}
            onConfirm={() => this.setState({ visibleBoost: false })}
            onPluzoPlus={() => this.setState({ visibleBoost: false })}
            onHide={() => this.setState({ visibleBoost: false })}
          />

          <SwipePurchaseModal
            isVisible={this.state.visibleSuperlike}
            purchaseType={"superlike"}
            colors={["#0C0518", "#080A47", "#0032BB"]}
            mainLogo={Images.swipe.superLikeLogo}
            text={"Super Like"}
            confirmText={"Get Super Likes"}
            selectColors={["#01C0FF", "#0044FF"]}
            onConfirm={() => this.setState({ visibleSuperlike: false })}
            onPluzoPlus={() => this.setState({ visibleSuperlike: false })}
            onHide={() => this.setState({ visibleSuperlike: false })}
          />

          <SwipePurchaseModal
            isVisible={this.state.visibleRewind}
            purchaseType={"rewinds"}
            colors={["#0C0518", "#320847", "#A10046"]}
            mainLogo={Images.swipe.rewindLogo}
            text={"Rewind"}
            confirmText={"Get Rewinds"}
            selectColors={["#FFA837", "#FF6600"]}
            onConfirm={() => this.setState({ visibleRewind: false })}
            onPluzoPlus={() => this.setState({ visibleRewind: false })}
            onHide={() => this.setState({ visibleRewind: false })}
          />

          <ReportModal
            isVisible={this.state.visibleReport}
            onDismiss={() => this.setState({ visibleReport: false })}
          />
        </SafeAreaView>
      </Screen>
    );
  }
}

export default Swipe;

import React from "react";
import { SafeAreaView } from "react-navigation";
import { Screen, Image } from "@components";
import Swiper from "react-native-deck-swiper";
import ProfileDetails from "./profile-details";
import { Notification, getCurrentLocation } from "@helpers";

import styles from "./swipe.style";
import ActionButtonsView from "./action-buttons-view";
import Card from "./card";
import NoUsers from "./no-users";

class Swipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      cardIndex: 0,
      likeCount: 0,
      location: null,
    };

    this.swiper = React.createRef();
  }

  componentDidMount() {
    this.props.loadCards(this.props.token);
    getCurrentLocation(position => {
      this.setState({ location: position });
    });
  }

  changeShowDetail = () => {
    const { visibleDetail } = this.props;
    this.props.setVisibleDetail(!visibleDetail);
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
    const { isLoadingCards, cards, visibleDetail } = this.props;
    const { cardIndex } = this.state;

    if (isLoadingCards || cards === null || cards.length === 0) {
      return (
        <Screen hasGradient style={styles.emptyContainer}>
          <NoUsers />
        </Screen>
      );
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
            disableBottomSwipe={true}
            cards={cards}
            cardIndex={0}
            cardVerticalMargin={0}
            cardHorizontalMargin={0}
            backgroundColor={"transparent"}
            renderCard={(card, index) => {
              return <Card card={card} changeShowDetail={this.changeShowDetail} />;
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
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: visibleDetail ? -60 : 0,
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
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: visibleDetail ? -60 : 0,
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
            animateOverlayLabelsOpacity={false}
            overlayOpacityHorizontalThreshold={10}
            animateCardOpacity
            swipeBackCard
            showSecondCard={true}
          />

          {!visibleDetail && (
            <ActionButtonsView
              onLike={this.onLikeClicked}
              onDisLike={this.onDisLikeClicked}
              onSuperLike={this.onSuperLikeClicked}
              onRocket={this.onRocketClicked}
              onReload={this.onReverseClicked}
            />
          )}
          {visibleDetail && (
            <ProfileDetails
              item={cards[cardIndex]}
              hideDetail={() => {
                this.changeShowDetail(false);
              }}
              onLike={this.onLikeClicked}
              onDisLike={this.onDisLikeClicked}
              onSuperLike={this.onSuperLikeClicked}
              location={this.state.location}
            />
          )}
        </SafeAreaView>
      </Screen>
    );
  }
}

export default Swipe;

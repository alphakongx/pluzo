import React from "react";
import { View } from "react-native";
import { Screen, Image, Text, BoostConfirmModal } from "@components";
import * as Animatable from "react-native-animatable";
import Swiper from "react-native-deck-swiper";
import EventBus from "eventing-bus";
import moment from "moment";
import { NavigationEvents } from "react-navigation";
import { CANCEL } from "redux-saga";
import AsyncStorage from "@react-native-community/async-storage";
import { API, getCurrentLocation, hasLocationPermission } from "@helpers";
import { API_ENDPOINTS } from "@config";
import { TUTORIAL } from "@constants";
import { SwipeTypes } from "@redux/actions";
import Images from "@assets/Images";

import styles, {width as screenWidth} from "./swipe.style";

import ReportModal from "../report-modal";
import ActionButtonsView from "./action-buttons-view";
import Card from "./card";
import NoUsers from "./no-users";
import MatchesView from "./matches-view";
import SwipePurchaseModal from "./swipe-purchase-modal";
import BoostTimeModal from "./boost-time-modal";
import GenderModal from "./no-users/gender-modal";

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
      visibleRemainingBoost: false,
      visibleBoostConfirm: false,
      visibleBoost: false,
      visibleSuperlike: false,
      visibleRewind: false,
      visibleReport: false,
      labelType: LABEL_TYPES.NONE,
      matchedUser: null,
      reportId: null,
      tutorialPointer: false,
      tutorialSwipe: false,
      tutorialGender: false,
      swipedCount: 0,
      isSwiping: false,
      enableRewinds: false,
      readyRewinds: true,
      enableSuperLike: true,
      hasPermission: false,
      visibleGender: false,
      swipeLocked: false,
    };

    this.swiper = React.createRef();
    this.cardIndex = -1;
    this.pageStartTime = 0;
  }

  componentDidMount() {
    this.reloadAction = EventBus.on(SwipeTypes.REQUEST_SET_SETTINGS_SUCCESS, () => {
      this.cardIndex = -1;
      this.props.loadCards(this.props.token, 1);
    });

    this.matchesAction = EventBus.on("New_Matches", user => {
      this.setState({ matchedUser: user });
    });

    this.stateAction = EventBus.on("AppState_Active", async () => {
      let hasPermission = await hasLocationPermission(true);
      if (this.state.hasPermission !== hasPermission) {
        this.onUpdateData(hasPermission);
      }
    });

    this.cardUpdateAction = EventBus.on("Need_Update_Cards", (removeIndex) => {
      let nRemoveIndex = parseInt(removeIndex, 10);
      if (nRemoveIndex <= this.cardIndex) {
        this.cardIndex -= 1;
        this.swiper && this.swiper.jumpToCardIndex(this.cardIndex + 1);
        this.props.updateCards({swipe: this.props.cards.filter((value, index) => index !== nRemoveIndex)}, removeIndex);
      } else if(nRemoveIndex === (this.props.cards.length -1) && (this.cardIndex+1) === nRemoveIndex) {
        this.cardIndex = -1;
        this.props.loadCards(this.props.token, 1);
      }
    });
    
    // checking tutorial mode
    AsyncStorage.getItem(TUTORIAL.SWIPE, (error, result) => {
      if (result === null || result === "0") {
        this.setState({tutorialSwipe: true});
      }
    });
    AsyncStorage.getItem(TUTORIAL.POINTER, (error, result) => {
      if (result === null || result === "0") {
        // this.setState({tutorialPointer: true});
      }
    });
    AsyncStorage.getItem(TUTORIAL.SHOW_GENDER, (error, result) => {
      if (result === null || result === "0") {
        this.setState({tutorialGender: true}); 
      }
    });

    // load swipe settings
    this.props.loadSettings(this.props.token);
  }

  componentWillUnmount() {
    this.reloadAction();
    this.matchesAction();
    this.stateAction();
    this.cardUpdateAction();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isSwiping !== this.state.isSwiping || 
      prevState.tutorialSwipe !== this.state.tutorialSwipe) {
      if (this.state.tutorialSwipe && !this.state.isSwiping) {
        this.props.updateTutorialMode(true);
      } else {
        this.props.updateTutorialMode(false);
      }
    }
    if (prevProps.isLoadingCards === true && this.props.isLoadingCards === false) {
      this.setState({ labelType: LABEL_TYPES.NONE });
    }
  }

  onWillFocus = async (payload) => {
    if (this.pageStartTime == 0) {
      this.pageStartTime = moment().unix();
    }
    let hasPermission = await hasLocationPermission(true);
    this.onUpdateData(hasPermission);
  }

  onWillBlur = (payload) => {
    if (payload.lastState.key !== payload.state.key) {
      const params = {
        timeStart: this.pageStartTime,
        timeEnd: moment().unix(),
        page: "Swipe",
      }
      this.pageStartTime = 0;
      this.props.requestPageTime(params, this.props.token);
    }
  }

  onUpdateData = (hasPermission) => {
    this.setState({hasPermission});
    if (hasPermission) {
      getCurrentLocation(position => {
        if (position) {
          const params = new FormData();
          params.append("latitude", position.coords.latitude);
          params.append("longitude", position.coords.longitude);
          this.props.updateUser(params, this.props.token);
        }
        if (this.props.cards.length === 0) {
          this.cardIndex = -1;
          this.props.loadCards(this.props.token, 1);
        }
      });
    } else {
      if (this.props.cards.length === 0) {
        this.cardIndex = -1;
        this.props.loadCards(this.props.token, 1);
      }
    }
  }

  onLikeClicked = () => {
    if (!this.state.swipeLocked) {
      this.setState({ labelType: LABEL_TYPES.RIGHT });
      this.swiper.swipeRight(false);
    }
  };

  onDisLikeClicked = () => {
    if (!this.state.swipeLocked) {
      this.setState({ labelType: LABEL_TYPES.LEFT });
      this.swiper.swipeLeft(false);
    }
  };

  onSuperLikeClicked = () => {
    const { user } = this.props;
    let superLikesCount = parseInt(user.advanced.super_likes, 10);
    if (superLikesCount > 0) {
      if (!this.state.swipeLocked) {
        this.setState({ labelType: LABEL_TYPES.TOP });
        this.swiper.swipeTop(false);
      } else {
        this.props.addSuperLikeDone();
      }
    } else {
      this.props.addSuperLikeDone();
      this.setState({ visibleSuperlike: true });
    }
  };

  onRocketClicked = (boosting, confirm = false) => {
    if (boosting) {
      this.setState({visibleRemainingBoost: true});
      return;
    }
    const { user, token } = this.props;
    let boostsCount = parseInt(user.advanced.boosts, 10);
    if (boostsCount > 0) {
      if (confirm) {
        this.setState({ visibleBoostConfirm: true });
      } else {
        this.setState({ labelType: LABEL_TYPES.BOOST }, () => {
          setTimeout(() => {
            this.setState({ labelType: LABEL_TYPES.NONE });
          }, 350);
        });
        this.props.runBoost(this.props.token, 1, null);
      }
    } else {
      this.setState({ visibleBoost: true });
    }
  };

  onRewindClicked = () => {
    const { user, token } = this.props;
    let rewindsCount = user.premium === 1 ? 1 : parseInt(user.advanced.rewinds, 10);
    if (rewindsCount > 0) {
      this.setState({ labelType: LABEL_TYPES.REWIND }, () => {
        setTimeout(() => {
          this.setState({ labelType: LABEL_TYPES.NONE});
        }, 350);
      });
      this.setState({ enableRewinds: false });
      this.props.runRewinds(token, this.props.cards[this.cardIndex].id);
      this.onSwiperRewind();
    } else {
      this.setState({ visibleRewind: true });
    }
  };

  onSwiperRewind = () => {
    this.setState({ swipeLocked: true, readyRewinds: false });
    this.swiper.swipeBack();
    this.cardIndex -= 1;
    this.onCheckingRewinds();
  }

  onCheckingRewinds = () => {
    if (this.cardIndex === this.props.cards.length - 1) {
      return;
    }
    if (this.props.isRewinding) this.rewindsChecking[CANCEL]();
    
    this.setState({ enableRewinds: false });
    if (this.cardIndex === -1) {
      return;
    } else {
      let data = new FormData();
      data.append("user_target_id", this.props.cards[this.cardIndex].id);
      this.rewindsChecking = API.request({
        method: "post",
        url: `${API_ENDPOINTS.IS_FRIENDS}`,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + this.props.token,
        },
        data,
        silent: true,
      })
        .then(response => {
          let res = response.data.data;
          if (res.friend === 4) {
            this.setState({ enableRewinds: false });
          } else {
            this.setState({ enableRewinds: true });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  onSwipedWithDirection = (index, type) => {
    const { token, cards } = this.props;

    if (index >= cards.length) {
      return;
    }

    if (this.state.tutorialSwipe && (type === "left" || type === "right")) {
      AsyncStorage.setItem(TUTORIAL.SWIPE, "1");
      this.setState({tutorialSwipe: false});
    }

    if (this.state.tutorialGender && this.state.swipedCount === 5 && (type === "left" || type === "right")) {
      if (this.props.cards.length >= (index + 1)) {
        this.setState({visibleGender: true});
      } else {
        this.setState({swipedCount: 4});
      }
    }

    if (this.props.user.premium === 0 && this.state.swipedCount === 9) {
      if (this.props.cards.length >= (index + 1)) {
        this.props.showPluzo(true, "swipe");
      } else {
        this.setState({swipedCount: 8});
      }
    }
    
    if (type === "left") {
      // dislike
      this.props.addDisLike(token, cards[index].id);
      this.setState({swipedCount: (this.state.swipedCount + 1)});
    } else if (type === "right") {
      // like
      this.props.addLike(token, cards[index].id, true);
      this.setState({swipedCount: (this.state.swipedCount + 1)});
    } else {
      // super like
      if (cards && cards[index]) {
        this.props.addSuperLike(token, cards[index].id);
      } else {
        this.props.addSuperLikeDone();
      }
    }
    this.setState({readyRewinds: true});
    
    if (cards && index === (cards.length - 1)) {
      this.setState({ labelType: LABEL_TYPES.NONE });
      this.cardIndex = -1;
      this.props.loadCards(this.props.token, 300);
    } else {
      this.cardIndex = index;
      this.onCheckingRewinds();
    }
  };

  onSwiped = (index) => {
    this.setState({ labelType: LABEL_TYPES.NONE });
    this.setState({ swipeLocked: false });
  }

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
      this.setState({ labelType: LABEL_TYPES.NONE });
    } else if (isSwipingBottom) {
      this.setState({ labelType: LABEL_TYPES.NONE });
    } else {
      this.setState({ labelType: LABEL_TYPES.NONE });
    }
  };

  render() {
    const { isLoadingCards, cards } = this.props;
    const { labelType, tutorialPointer, swipedCount, hasPermission } = this.state;

    // if (hasPermission === false) {
    //   return (
    //     <Screen hasGradient style={styles.emptyContainer}>
    //       <NoUsers navigation={this.props.navigation} permission />
    //       <NavigationEvents 
    //         onWillFocus={(payload) => this.onWillFocus(payload)}
    //         onWillBlur={(payload) => this.onWillBlur(payload)} />
    //     </Screen>
    //   )
    // }

    if (isLoadingCards || cards === null || cards === undefined || cards.length === 0) {
      return (
        <Screen hasGradient style={styles.emptyContainer}>
          <NoUsers navigation={this.props.navigation} />
          <NavigationEvents 
            onWillFocus={(payload) => this.onWillFocus(payload)}
            onWillBlur={(payload) => this.onWillBlur(payload)} />
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
        <View style={styles.contentContainer}>
          <Swiper
            ref={swiper => {
              this.swiper = swiper;
            }}
            swipeAnimationDuration={200}
            horizontalThreshold={Math.floor(screenWidth / 8)}
            onSwipedLeft={index => this.onSwipedWithDirection(index, "left")}
            onSwipedRight={index => this.onSwipedWithDirection(index, "right")}
            onSwipedTop={index => this.onSwipedWithDirection(index, "top")}
            onSwiped={index => this.onSwiped(index)}
            onSwiping={(x, y) => {
              this.onSwiping(x, y);
            }}
            disableTopSwipe={true}
            disableBottomSwipe={true}
            cards={cards}
            cardIndex={this.cardIndex + 1}
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
                  onReport={(userId) => this.setState({ reportId: userId, visibleReport: true })}
                  onClickedCard={(tutorialPointer && swipedCount === 3) ? () => {
                    AsyncStorage.setItem(TUTORIAL.POINTER, "1");
                    this.setState({tutorialPointer: false});
                  } : null}
                  index={index}
                />
              );
            }}
            stackSize={2}
            stackSeparation={0}
            stackScale={0}
            overlayLabels={null}
            animateOverlayLabelsOpacity={false}
            animateCardOpacity
            swipeBackCard
            showSecondCard={true}
            dragStart={() => {
              this.setState({isSwiping: true});
            }}
            dragEnd={() => {
              this.setState({ labelType: LABEL_TYPES.NONE, isSwiping: false });
            }}
          />

          {labelType !== LABEL_TYPES.NONE && (
            labelType === LABEL_TYPES.REWIND ? 
            <Animatable.Image source={overlayIcon} style={styles.heartIcon}
              animation={"rotate"} easing="ease-out" duration={300} /> : 
            <Animatable.Image source={overlayIcon} style={styles.heartIcon} />
          )}

          <ActionButtonsView
            onLike={this.onLikeClicked}
            onDisLike={this.onDisLikeClicked}
            onSuperLike={this.onSuperLikeClicked}
            onRocket={this.onRocketClicked}
            onReload={this.onRewindClicked}
            isRewinds={this.state.enableRewinds && this.state.readyRewinds}
            isSuperLike={this.state.enableSuperLike}
          />

          {this.state.matchedUser !== null && (
            <View style={styles.matchesContainer}>
              <MatchesView
                matchedUser={this.state.matchedUser}
                onHide={() => this.setState({ matchedUser: null })}
              />
            </View>
          )}

          {(tutorialPointer && swipedCount === 3 && this.props.cards.length >= (this.cardIndex+1)) && 
          <View style={styles.tutorialContainer} pointerEvents={"none"}>
            <View style={styles.tutorialPointerLeft}>
              <Image source={Images.tutorial.icPointer} />
              <Text style={styles.tutorialText}>Previous Photo</Text>
            </View>
            <View style={styles.tutorialSeperator}/>
            <View style={styles.tutorialPointerRight}>
              <Image source={Images.tutorial.icPointer} />
              <Text style={styles.tutorialText}>Next Photo</Text>
            </View>
          </View>}

        </View>
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
          mainLogoCenter={Images.swipe.superLikeLogoCenter}
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
          mainLogoCenter={Images.swipe.rewindLogoCenter}
          text={"Rewind"}
          confirmText={"Get Rewinds"}
          selectColors={["#FFA837", "#FF6600"]}
          onConfirm={() => this.setState({ visibleRewind: false })}
          onPluzoPlus={() => this.setState({ visibleRewind: false })}
          onHide={() => this.setState({ visibleRewind: false })}
        />

        <ReportModal
          isVisible={this.state.visibleReport}
          userId={this.state.reportId}
          onDismiss={() => this.setState({ visibleReport: false })}
        />
        
        <BoostConfirmModal
          isVisible={this.state.visibleBoostConfirm}
          title={"Boost your profile"}
          content={"Keep swiping for the best results."}
          onBack={() => this.setState({visibleBoostConfirm: false})}
          onBoost={() => {
            this.setState({visibleBoostConfirm: false});
            this.onRocketClicked(false, false);
          }} 
        />

        <BoostTimeModal 
          isVisible={this.state.visibleRemainingBoost}
          onBack={() => this.setState({visibleRemainingBoost: false})}
          onBoost={(boosting) => {
            this.setState({visibleRemainingBoost: false});
            setTimeout(() => {
              this.onRocketClicked(false, false);
            }, 500);
          }}
          isSwipe={true} />

        <GenderModal
          key={`swipe-gender-modal`}
          isVisible={this.state.visibleGender}
          tutorial
          onDismiss={() => {
            if (parseInt(this.props.settings.gender, 10) === 0) {
              this.setState({visibleGender: false}, () => {
                AsyncStorage.setItem(TUTORIAL.SHOW_GENDER, "1");
              });
            } else {
              this.setState({visibleGender: false}, () => {
                this.props.updateSettings(this.props.token, {gender: 0});
                AsyncStorage.setItem(TUTORIAL.SHOW_GENDER, "1");
              });
            }
          }}
          gender={-1}
          onChange={(value) => {
            if (parseInt(this.props.settings.gender, 10) === value) {
              this.setState({visibleGender: false}, () => {
                AsyncStorage.setItem(TUTORIAL.SHOW_GENDER, "1");
              });
            } else {
              this.setState({visibleGender: false}, () => {
                this.props.updateSettings(this.props.token, {gender: value});
                AsyncStorage.setItem(TUTORIAL.SHOW_GENDER, "1");
              });
            }
          }} />

          <NavigationEvents 
            onWillFocus={(payload) => this.onWillFocus(payload)}
            onWillBlur={(payload) => this.onWillBlur(payload)} />
      </Screen>
    );
  }
}

export default Swipe;

import React, { Component } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { Screen, BackButton, Image, Text, Touchable, GradientButton } from "@components";
import { SCREENS } from "@constants";
import { getLikedUsers } from "@redux/api";
import * as Animatable from "react-native-animatable";
import Images from "@assets/Images";
import LikedUserItem from "./liked-user-item";
import Swiper from "react-native-deck-swiper";
import PurchaseModal from "../profile-settings/purchase-modal";
import styles from "./like-users.style";

const { createAnimatableComponent } = Animatable;
const AnimatableView = createAnimatableComponent(View);

class LikeUsersScreen extends Component {
  constructor(props) {
    super(...arguments);
    this.state = {
      likedUsers: [],
      visiblePurchase: false,
      swipeIndex: -1,
    };
  }

  componentDidMount() {
    getLikedUsers(this.props.token).then(response => {
      this.setState({ likedUsers: response.data.data });
    });console.log(this.props.user);
  }

  onSwipedWithDirection = (eventIndex, type) => {
    const { token } = this.props;
    const { likedUsers } = this.state;

    let eventedUserId = likedUsers[eventIndex].user._id;
    this.setState({likedUsers: likedUsers.filter((value, index) => index !== eventIndex)});

    if (type === "left") {
      this.props.addDisLike(token, eventedUserId);
    } else if (type === "right") {
      this.props.addLike(token, eventedUserId);
    }
  };

  render() {
    const { likedUsers, swipeIndex } = this.state;
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

            <FlatList
              style={styles.listContainer}
              contentContainerStyle={styles.listContentContainer}
              data={likedUsers}
              numColumns={2}
              keyExtractor={(item, index) => `liked-user-${index}`}
              ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
              renderItem={({ item: likedUser, index }) => {
                if (this.props.user.premium === 0) {
                  return (
                    <Touchable
                      disabled={true}
                    >
                      <LikedUserItem likedUser={likedUser} />
                    </Touchable>
                  )
                }
                return (
                  <View
                    style={[styles.itemContainer, swipeIndex === index ? styles.zIndexHigh : styles.zIndexZero]}>
                    <Swiper
                      horizontalThreshold={25}
                      overlayOpacityHorizontalThreshold={25}
                      cards={[likedUser]}
                      cardIndex={0}
                      cardVerticalMargin={0}
                      cardHorizontalMargin={0}
                      backgroundColor={"transparent"}
                      renderCard={(card, cardIndex) => {
                        return (
                          <Touchable onPress={() => {console.log("OK");
                            this.props.navigation.navigate(SCREENS.PROFILE_VIEW, {
                              user: card.user,
                            });
                          }}>
                          <LikedUserItem likedUser={card}
                            zIndex={swipeIndex !== -1 && likedUsers[swipeIndex].user._id === card.user._id} />
                          </Touchable>
                        );
                      }}
                      verticalSwipe={false}
                      overlayLabels={{
                        left: {
                          element: <Image source={require("@assets/images/swipe-screen/swipe-cross.png")} />,
                          style: { wrapper: styles.overlayDislike }
                        },
                        right: {
                          element: <Image source={require("@assets/images/swipe-screen/swipe-heart.png")} />,
                          style: { wrapper: styles.overlayDislike }
                        },
                      }}
                      dragStart={() => this.setState({swipeIndex: index})}
                      dragEnd={() => this.setState({swipeIndex: -1})}
                      onSwipedLeft={(swipedIndex) => this.onSwipedWithDirection(index, "left")}
                      onSwipedRight={(swipedIndex) => this.onSwipedWithDirection(index, "right")}
                    />
                  </View>
                );
              }}
              ListEmptyComponent={() => {
                return (
                  <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>{"You have no likes\nSwipe to meet more people!"}</Text>
                  </View>
                )
              }}
            />
            
            {this.props.user.premium === 0 &&
            <View style={styles.buttonContainer}>
              <GradientButton
                colors={["#FF7131", "#E0E552"]}
                shadowColor={"#FF6F00"}
                text={"Get Pluzo Plus"}
                onPress={() => this.setState({visiblePurchase: true})}
              />
              <AnimatableView
                animation={{
                  from: {["translateY"]: -2.5},
                  to: {["translateY"]: 2.5}
                }}
                iterationCount={"infinite"}
                direction="alternate"
                duration={1500}
                style={styles.plusMark}
                pointerEvents={"box-none"}>
                <Image
                  source={Images.swipe.pluzoPlusMark}
                  pointerEvents={"none"}
                  style={styles.plusImage}
                />
              </AnimatableView>
            </View>}
            {this.props.user.premium === 1 &&
            <View style={styles.buttonContainer}>
              <GradientButton
                colors={["#9C3DE2", "#D491FF"]}
                shadowColor={"#6E00FF"}
                text={"Boost me"}
                icon={Images.app.icRocket}
                containerStyle={styles.flexRow}
                iconStyle={styles.boostIcon}
              />
              <AnimatableView
                animation={{
                  from: {["translateY"]: -2.5},
                  to: {["translateY"]: 2.5}
                }}
                iterationCount={"infinite"}
                direction="alternate"
                duration={1500}
                style={styles.plusMark}
                pointerEvents={"box-none"}>
                <Image
                  source={Images.app.boostBubbles}
                  pointerEvents={"none"}
                  style={styles.bubblesImage}
                />
              </AnimatableView>
            </View>}
          </View>

          <PurchaseModal
            isVisible={this.state.visiblePurchase}
            onSwipeComplete={() => this.setState({visiblePurchase: false})}
          />
        </SafeAreaView>
      </Screen>
    );
  }
}

export default LikeUsersScreen;

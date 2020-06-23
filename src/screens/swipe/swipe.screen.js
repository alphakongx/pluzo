import React, { useState } from "react";
import { View } from "react-native";
import { Text } from "@components";
import LinearGradient from "react-native-linear-gradient";
import Swiper from "react-native-deck-swiper";
import Header from "./header";
import { GRADIENT } from "@config";

import styles from "./swipe.style";

function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

const Swipe: () => React$Node = props => {
  const [cards] = useState([...range(1, 50)]);
  const [setSwiprAllCards] = useState(false);
  // const [swipeDirection] = useState("");
  const [cardIndex] = useState(0);

  const renderCard = (card, index) => {
    return (
      <View style={styles.card}>
        <Text style={styles.text}>
          {card} - {index}
        </Text>
      </View>
    );
  };

  const onSwipedAllCards = () => {
    setSwiprAllCards(true);
  };

  const onSwiped = type => {
    console.log(`on swiped ${type}`);
  };

  const swipeLeft = () => {
    // this.swiper.swipeLeft();
  };

  return (
    <LinearGradient
      colors={GRADIENT.SCREEN_BACKGROUND}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <Header />
      <View style={styles.contentContainer}>
        <Swiper
          ref={swiper => {
            // this.swiper = swiper;
          }}
          onSwiped={() => onSwiped("general")}
          onSwipedLeft={() => onSwiped("left")}
          onSwipedRight={() => onSwiped("right")}
          onSwipedTop={() => onSwiped("top")}
          onSwipedBottom={() => onSwiped("bottom")}
          onTapCard={swipeLeft}
          cards={cards}
          cardIndex={cardIndex}
          cardVerticalMargin={80}
          renderCard={renderCard}
          onSwipedAll={onSwipedAllCards}
          stackSize={3}
          stackSeparation={15}
          overlayLabels={{
            bottom: {
              title: "BLEAH",
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
            left: {
              title: "NOPE",
              style: {
                label: {
                  backgroundColor: "black",
                  borderColor: "black",
                  color: "white",
                  borderWidth: 1,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                  marginTop: 30,
                  marginLeft: -30,
                },
              },
            },
            right: {
              title: "LIKE",
              style: {
                label: {
                  backgroundColor: "black",
                  borderColor: "black",
                  color: "white",
                  borderWidth: 1,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  marginTop: 30,
                  marginLeft: 30,
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
        >
          {/*<Button onPress={() => this.swiper.swipeBack()} title='Swipe Back' />*/}
        </Swiper>
      </View>
    </LinearGradient>
  );
};

export default Swipe;

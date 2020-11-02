import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Image, Touchable } from "@components";
import styles from "./action-buttons-view.style";

const ActionButtonsView: () => React$Node = props => {
  return (
    <View style={styles.bottomActions} pointerEvents={"box-none"}>
      <SafeAreaView>
        <View style={styles.bottomContainer} pointerEvents={"box-none"}>
          <View style={[styles.buttonRow]} pointerEvents={"box-none"}>
            <Touchable onPress={() => props.onReload()}>
              <Image
                style={styles.buttonSmall}
                source={require("@assets/images/swipe-screen/swipe-refresh.png")}
              />
            </Touchable>
            <Touchable onPress={() => props.onRocket()}>
              <Image
                style={styles.buttonSmall}
                source={require("@assets/images/swipe-screen/swipe-rocket.png")}
              />
            </Touchable>
          </View>
          <View
            style={[styles.buttonRow, styles.buttonRowMargin]}
            pointerEvents={"box-none"}
          >
            <Touchable onPress={() => props.onDisLike()}>
              <Image
                source={require("@assets/images/swipe-screen/swipe-cross.png")}
                style={styles.buttonNormal}
              />
            </Touchable>
            <Touchable onPress={() => props.onSuperLike()}>
              <Image
                source={require("@assets/images/swipe-screen/swipe-star.png")}
                style={styles.buttonSmall}
              />
            </Touchable>
            <Touchable onPress={() => props.onLike()}>
              <Image
                source={require("@assets/images/swipe-screen/swipe-heart.png")}
                style={styles.buttonNormal}
              />
            </Touchable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ActionButtonsView;

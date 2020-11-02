import React from "react";
import { View, SafeAreaView } from "react-native";
import { Image, Text, Touchable } from "@components";
import FastImage from "react-native-fast-image";
import Images from "@assets/Images";
import styles from "./header.style";

const Header: () => React$Node = props => {
  const { first_name, images, avatar } = props.user;
  let name = first_name === null ? "No Name" : first_name;
  let userImage =
    props.user === 0
      ? null
      : images !== undefined && images.length > 0
      ? images[0].path
      : avatar;
  let picture = userImage === null ? Images.app.userPlaceholder : userImage;
  if (props.user === 0) {
    name = "Pluzo Team";
    picture = require("@assets/images/app-icon.png");
  }

  return (
    <View style={styles.headerContainer}>
      <SafeAreaView>
        <View style={styles.header}>
          <View style={styles.backButtonContainer}>
            <Touchable
              style={styles.backButtonTouchable}
              onPress={() => {
                props.onBack();
              }}
            >
              <Image source={require("@assets/images/chevron-left.png")} />
            </Touchable>
          </View>
          <Touchable
            onPress={() => {
              props.onProfileView();
            }}
            style={styles.headerContentContainer}
          >
            <FastImage
              style={styles.headerImage}
              source={typeof picture === "string" ? { uri: picture } : picture}
            />
            <Text style={styles.headerTitle}>{name}</Text>
          </Touchable>
          <View style={styles.reportButtonContainer}>
            <Touchable style={styles.reportButtonTouchable} onPress={props.onReport}>
              <Image
                source={require("@assets/images/report.png")}
                style={styles.reportIcon}
              />
            </Touchable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Header;

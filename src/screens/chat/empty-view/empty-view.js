import React from "react";
import { View } from "react-native";
import { Image, Text } from "@components";
import FastImage from "react-native-fast-image";
import Images from "@assets/Images";
import styles from "./empty-view.style";

const EmptyView: () => React$Node = props => {
  const { images, avatar } = props.user;
  let userImage =
    props.user === 0
      ? null
      : images !== undefined && images.length > 0
      ? images[0].path
      : avatar;
  let picture = userImage === null ? Images.app.userPlaceholder : userImage;
  if (props.user === 0) {
    picture = require("@assets/images/app-icon.png");
  }

  return (
    <View style={styles.container}>
      <FastImage
        style={styles.userImage}
        source={typeof picture === "string" ? { uri: picture } : picture}
      />
      <View style={styles.contentView}>
        <Text style={styles.contentText}>Say Hi!</Text>
        <Image source={require("@assets/images/heart1.png")} style={styles.heartIcon} />
      </View>
    </View>
  );
};

export default EmptyView;

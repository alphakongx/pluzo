import React, { Component } from "react";
import { View } from "react-native";
import { Image } from "@components";

import styles from "./stream-player.style";

class StreamPlayer extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Image
          source={require("@assets/images/live-screen/user-temp2.png")}
          style={styles.image}
        />
      </View>
    );
  }
}

export default StreamPlayer;

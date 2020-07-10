import PropTypes from "prop-types";
import React, { Component } from "react";
import { View } from "react-native";
import { Image } from "@components";
import Images from "@assets/Images";

import styles from "./stream-user-icon.style";

class StreamUserIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isStreamer, icon } = this.props;
    return (
      <View style={[styles.container, this.props.style]}>
        <Image source={icon} style={styles.image} />
        {isStreamer && (
          <View style={styles.micContainer}>
            <Image source={Images.app.icMic} style={styles.mic} />
          </View>
        )}
      </View>
    );
  }
}

StreamUserIcon.propTypes = {
  isStreamer: PropTypes.bool,
  icon: PropTypes.any,
};

StreamUserIcon.defaultProps = {
  isStreamer: true,
  icon: require("@assets/images/live-screen/user-temp3.png"),
};

export default StreamUserIcon;

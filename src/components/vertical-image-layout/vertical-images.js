import PropTypes from "prop-types";
import React, { Component } from "react";
import { View } from "react-native";
import FastImage from "react-native-fast-image";

import styles from "./vertical-image.style";

class VerticalImagesLayout extends Component {
  render() {
    var { images } = this.props;

    if (images.length === 1) {
      return (
        <View style={styles.container}>
          <FastImage source={{ uri: images[0].path }} style={styles.imageOne} />
        </View>
      );
    }

    if (images.length === 2) {
      return images.map((item, index) => {
        return (
          <View style={styles.container} key={index}>
            <FastImage source={{ uri: item.path }} style={styles.imageTwo} />
          </View>
        );
      });
    }

    if (images.length % 2 === 0) {
      return (
        <View style={styles.container}>
          {images.map((item, index) => {
            return (
              <FastImage
                source={{ uri: item.path }}
                style={styles.imageFour}
                key={index}
              />
            );
          })}
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {images.map((item, index) => {
          return index === 0 ? (
            <FastImage source={{ uri: item.path }} style={styles.imageTwo} key={index} />
          ) : (
            <FastImage source={{ uri: item.path }} style={styles.imageFour} key={index} />
          );
        })}
      </View>
    );
  }
}

VerticalImagesLayout.propTypes = {
  images: PropTypes.array.isRequired,
};

VerticalImagesLayout.defaultProps = {
  images: [],
};

export default VerticalImagesLayout;

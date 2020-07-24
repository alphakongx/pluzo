import PropTypes from "prop-types";
import React, { Component } from "react";
import { View } from "react-native";
import { Image } from "../image";

import styles from "./vertical-image.style";

class VerticalImagesLayout extends Component {
  render() {
    var { images } = this.props;

    if (images.length === 1) {
      return (
        <View style={styles.container}>
          <Image source={images[0]} style={styles.imageOne} />
        </View>
      );
    }

    if (images.length === 2) {
      return images.map((item, index) => {
        return (
          <View style={styles.container} key={index}>
            <Image source={item} style={styles.imageTwo} />
          </View>
        );
      });
    }

    if (images.length % 2 === 0) {
      return (
        <View style={styles.container}>
          {images.map((item, index) => {
            return <Image source={item} style={styles.imageFour} key={index} />;
          })}
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {images.map((item, index) => {
          return index === 0 ? (
            <Image source={item} style={styles.imageTwo} key={index} />
          ) : (
            <Image source={item} style={styles.imageFour} key={index} />
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

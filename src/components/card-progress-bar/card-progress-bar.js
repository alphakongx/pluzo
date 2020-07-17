import React from "react";
import { View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styles from "./card-progress-bar.style";

const CardProgressBar: () => React$Node = props => {
  const { count, activeIndex } = props;
  var arr = [];
  for (var i=0;i<count;i++) {
    arr.push(i);
  }
  return (
    <View style={styles.container}>
      {
        arr.map((value, index) => {
          if (index === activeIndex) {
            return (
              <View style={[styles.gradientFill, { width: (100 / props.count) + "%" }]}>
                <LinearGradient
                  colors={["#617FFF", "#02FFF3"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.flexFill}
                />
                <View style={styles.separator} />
              </View>
            );
          } else {
            return (
              <View style={[styles.gradientFill, { width: (100 / props.count) + "%" }]}>
                <View style={styles.remainingFill} />
                <View style={styles.separator} />
              </View>
            );
          }
        })
      }
    </View>
  );
};

CardProgressBar.defaultProps = {
  count: 2,
  activeIndex: 0,
};

export default CardProgressBar;

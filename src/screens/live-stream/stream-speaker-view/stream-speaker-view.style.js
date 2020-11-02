import { StyleSheet, Dimensions } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {},
  volumeContainer: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    left: wp(11),
    right: wp(10),
    top: wp(5),
    bottom: wp(5),
    borderRadius: wp(30),
  },
  volumeContainer1: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    left: wp(1),
    right: wp(1),
    top: wp(1),
    bottom: wp(1),
    borderRadius: wp(30),
  },
});

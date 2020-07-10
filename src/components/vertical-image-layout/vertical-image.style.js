import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("screen").width;

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    overflow: "hidden",
  },
  imageOne: {
    resizeMode: "cover",
    width: (screenWidth - 30) / 2,
    height: (screenWidth - 30) / 2,
  },

  imageTwo: {
    resizeMode: "cover",
    width: (screenWidth - 30) / 2,
    height: (screenWidth - 30) / 4,
  },

  imageFour: {
    resizeMode: "cover",
    width: (screenWidth - 30) / 4,
    height: (screenWidth - 30) / 4,
  },
});

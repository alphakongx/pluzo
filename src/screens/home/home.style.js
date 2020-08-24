import { StyleSheet, Dimensions } from "react-native";

export const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },

  absoluteView: {
    position: "absolute",
  },

  fullView: {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  minimizedView: {
    width: 130,
    height: 200,
  },

  floatingContainer: {
    flex: 1,
    overflow: "hidden",
  },
  border: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.43)",
  },
});

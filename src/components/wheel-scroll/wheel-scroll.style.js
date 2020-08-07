import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    overflow: "hidden",
    alignItems: "center",
  },

  topGradientBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "50%",
    opacity: 0.1,
  },

  bottomGradientBackground: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    opacity: 0.1,
  },

  highlightView: {
    position: "absolute",
  },

  selectedItem: {
    justifyContent: "center",
    alignItems: "center",
  },

  scrollContainer: {
    width: "100%",
    flex: 1,
  }
});

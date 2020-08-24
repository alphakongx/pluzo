import { StyleSheet, Dimensions } from "react-native";

export const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    borderRadius: 22,
    overflow: "hidden",
    marginBottom: 20,
  },
  allContainer: {
    height: 160 + (width - 275) / 2,
    marginBottom: 40,
  },

  trendingText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  iconsContainer: {
    paddingLeft: 15,
    flexWrap: "wrap",
    flexDirection: "row",
  },
  emojiButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: (width - 275) / 6,
    marginBottom: (width - 275) / 6,
    backgroundColor: "#312446",
    justifyContent: "center",
    alignItems: "center",
  },

  spacerView: {
    height: 10,
  },

  fadeContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    height: 90,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },

  expandButtonContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
  },
  expandButton: {
    width: 40,
    height: 40,
  },
  expandIcon: {
    tintColor: "#0B0516",
  },
});

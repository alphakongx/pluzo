import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  currentItem: {
    flex: 1,
    borderRadius: 22,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },

  contentContainer: {
    zIndex: 9998,
    position: "absolute",
    backgroundColor: "#ABA7D5",
    left: 0,
    right: 0,
    height: 200,
    borderRadius: 22,
  },

  spacer: {
    height: 50,
  },
  bottomFade: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 20,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },

  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  flag: {
    width: 24,
    height: 14,
    resizeMode: "stretch",
  },
});

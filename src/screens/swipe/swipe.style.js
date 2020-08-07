import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  contentContainer: {
    flex: 1,
  },
  heartIcon: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  topActions: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingBottom: 50,
  },

  noUsers: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
  },
});

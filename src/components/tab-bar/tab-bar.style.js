import { StyleSheet } from "react-native";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  tabContainer: {
    width: "100%",
    flexDirection: "row",
    height: 50,
    alignItems: "center",
  },
  transparentTab: {
    backgroundColor: "transparent",
  },
  normalTab: {
    backgroundColor: COLOR.HEADER_BACKGROUND,
    shadowOpacity: 0.05,
    shadowRadius: 5,
    borderTopWidth: 0,
    elevation: 15,
  },
  tabButton: {
    flex: 1,
  },

  fadeContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
});

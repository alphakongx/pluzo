import { StyleSheet } from "react-native";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flex: 1,
    borderRadius: 4,
    justifyContent: "center",
    backgroundColor: COLOR.HEADER_BACKGROUND,
  },
  cardImage: {
    width: "100%",
    flex: 1,
    backgroundColor: COLOR.HEADER_BACKGROUND,
  },

  topActions: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingBottom: 50,
  },
});

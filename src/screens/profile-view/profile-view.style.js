import { StyleSheet } from "react-native";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  flexFill: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  contentContainer: {
    flex: 1,
    marginTop: 15,
    marginBottom: 35,
    marginHorizontal: 15,
    borderRadius: 22,
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: COLOR.HEADER_BACKGROUND,
  },
  detailContainer: {
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
});

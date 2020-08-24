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
    backgroundColor: "#0000",
  },
  gestureContainer: {
    flex: 1,
    marginTop: 15,
    marginBottom: 35,
    marginHorizontal: 15,
  },
  touchArea: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    borderRadius: 22,
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: COLOR.HEADER_BACKGROUND,
  },
  profileImage: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  detailContainer: {
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
});

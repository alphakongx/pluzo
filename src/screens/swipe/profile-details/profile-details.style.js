import { StyleSheet } from "react-native";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: COLOR.HEADER_BACKGROUND,
  },
  contentContainer: {
    padding: 20,
    overflow: "visible",
    marginBottom: 50,
  },
  closeButton: {
    position: "absolute",
    top: -27,
    left: 0,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowMarginTop: {
    marginTop: 5,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonNormal: {
    width: 70,
    height: 70,
  },
  buttonSmall: {
    width: 50,
    height: 50,
  },
  largeText: {
    fontSize: 26,
    fontWeight: "600",
    color: COLOR.TEXT_PRIMARY,
  },
  smallText: {
    fontSize: 10,
    color: COLOR.TEXT_SECONDARY_2,
    marginLeft: 5,
  },
  descriptionText: {
    fontSize: 12,
    color: COLOR.TEXT_SECONDARY_4,
  },
  onlineStatus: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  flexSpace: {
    flex: 1,
  },
  followerContainer: {
    height: 24,
    flexDirection: "row",
    paddingHorizontal: 13,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  followerCount: {
    fontSize: 16,
    fontWeight: "800",
    color: COLOR.TEXT_SECONDARY_3,
  },
  followerUnit: {
    fontFamily: "OpenSans",
    fontSize: 12,
    fontWeight: "400",
    color: COLOR.TEXT_SECONDARY_3,
    marginLeft: 2,
  },
  descriptionContainer: {
    paddingVertical: 20,
  },
});

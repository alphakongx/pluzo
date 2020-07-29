import { StyleSheet } from "react-native";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.HEADER_BACKGROUND,
  },
  safeAreaContainer: {
    flex: 1,
  },

  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemPadding: {
    padding: 20,
  },

  titleText: {
    flex: 1,
    color: "white",
    fontFamily: "OpenSans",
    fontSize: 14,
    fontWeight: "400",
  },
  valueText: {
    color: "#E8E6FF",
    fontFamily: "OpenSans",
    fontSize: 12,
    fontWeight: "400",
    textAlign: "right",
  },
  subValueText: {
    color: "#E8E6FF",
    fontFamily: "OpenSans",
    fontSize: 8,
    fontWeight: "400",
    textAlign: "right",
  },
  arrowRight: {
    marginLeft: 10,
  },

  separator: {
    height: 1,
    backgroundColor: "white",
    opacity: 0.15,
  },

  thumbMaker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "white",
  },
  sliderContainer: {
    height: 20,
    marginLeft: 25,
    marginBottom: 20,
  },
  tracker: {
    height: 4,
    borderRadius: 2,
  },
  selectedTracker: {
    backgroundColor: "#02FFF3",
  },
  unselectedTracker: {
    backgroundColor: COLOR.TEXT_SECONDARY_4,
  },

  description: {
    color: COLOR.TEXT_SECONDARY_4,
    fontFamily: "OpenSans",
    fontSize: 12,
    fontWeight: "400",
    paddingHorizontal: 20,
  },
});

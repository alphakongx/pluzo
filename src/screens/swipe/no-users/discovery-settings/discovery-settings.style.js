import { StyleSheet } from "react-native";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.HEADER_BACKGROUND,
    borderRadius: 22,
    paddingBottom: 20,
  },
  
  headerContainer: {
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  backButton: {
    width: 30,
    height: 50,
    justifyContent: "center",
  },
  backButtonIcon: {
    width: 12,
    height: 18,
    resizeMode: "contain",
  },

  settingText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginHorizontal: 20,
    marginBottom: 10,
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
    paddingLeft: 20,
    paddingRight: 5,
  },
});

import { StyleSheet, Dimensions } from "react-native";
import { COLOR } from "@config";

const screenWidth = Dimensions.get("window").width;

export default StyleSheet.create({
  flexFill: {
    flex: 1,
  },
  container: {
    borderRadius: 22,
  },
  headerContainer: {
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
  },

  myBadgeScroll: {
    backgroundColor: COLOR.SEARCH_INPUT_BORDER,
    height: 58,
  },
  scrollContentCenter: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  myBadgeContainer: {
    width: 52,
    height: 36,
    alignItems: "center",
  },
  myBadgeView: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLOR.HEADER_BACKGROUND,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeImage: {
    width: 16,
    height: 16,
    resizeMode: "contain",
  },
  badgeActive: {
    backgroundColor: "white",
  },

  noteText: {
    fontFamily: "OpenSans",
    fontSize: 12,
    color: COLOR.TEXT_SECONDARY_4,
    paddingHorizontal: 50,
    paddingVertical: 8,
    textAlign: "center",
  },
  separatorLine: {
    height: 1,
    backgroundColor: "white",
    opacity: 0.15,
    marginVertical: 8,
  },

  allBadgeScroll: {
    height: 155,
  },
  flexWrap: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  allBadgeItem: {
    width: (screenWidth - 42) / 6,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  badgeWrapper: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeSelectedWrapper: {
    width: 30,
    height: 30,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#312466",
  },
});

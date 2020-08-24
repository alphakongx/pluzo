import { StyleSheet } from "react-native";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
  topActionRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  topRowMargin: {
    marginTop: 20,
  },
  topRowMarginSmall: {
    marginTop: 8,
  },
  onlineStatus: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  topBarName: {
    fontSize: 22,
    fontWeight: "600",
    color: COLOR.TEXT_PRIMARY,
  },
  topBarLocation: {
    fontFamily: "OpenSans",
    fontSize: 10,
    color: COLOR.TEXT_SECONDARY_2,
    marginLeft: 5,
  },
  flexSpace: {
    flex: 1,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoIcon: {
    width: 15,
    height: 15,
  },
  distanceContainer: {
    height: 24,
    flexDirection: "row",
    paddingHorizontal: 13,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  distanceText: {
    fontSize: 16,
    fontWeight: "800",
    color: COLOR.TEXT_SECONDARY_3,
  },
  distanceUnit: {
    fontFamily: "OpenSans",
    fontSize: 12,
    fontWeight: "400",
    color: COLOR.TEXT_SECONDARY_3,
    marginLeft: 2,
  },

  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 9,
  },
  badgeIcon: {
    width: 18,
    height: 18,
    resizeMode: "contain",
    marginRight: 5,
    marginBottom: 5,
  },
});

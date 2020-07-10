import { StyleSheet } from "react-native";
import { COLOR } from "@config";

export default StyleSheet.create({
  topActionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
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
    fontSize: 26,
    fontWeight: "600",
    color: COLOR.TEXT_PRIMARY,
  },
  topBarLocation: {
    fontSize: 10,
    color: COLOR.TEXT_SECONDARY_2,
    marginLeft: 5,
  },
  flexSpace: {
    flex: 1,
  },
});

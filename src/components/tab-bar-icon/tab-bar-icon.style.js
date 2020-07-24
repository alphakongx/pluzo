import { StyleSheet } from "react-native";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.TAB_ACTIVE,
    alignItems: "center",
    width: "100%",
    paddingVertical: 4,
  },
  inactiveContainer: {
    backgroundColor: COLOR.TAB_INACTIVE,
  },
  centerSide: {
    borderRadius: 25,
  },
  leftSide: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 25,
  },
  rightSide: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 0,
  },
  tabIcon: {
    width: 18,
    height: 18,
  },
  tabText: {
    color: COLOR.TEXT_PRIMARY,
    marginTop: 2,
    fontSize: 12,
  },
  inactiveText: {
    opacity: 0.5,
  },
});

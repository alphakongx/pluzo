import { StyleSheet } from "react-native";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  userIcon: {
    width: 12,
    height: 35,
    resizeMode: "contain",
  },
  userCount: {
    fontWeight: "bold",
    color: COLOR.TEXT_INPUT,
  },
});

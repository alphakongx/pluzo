import { StyleSheet } from "react-native";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.HEADER_BACKGROUND,
  },
  flexFill: {
    flex: 1,
  },
  flexRow: {
    flex: 1,
    flexDirection: "row",
  },
  flexColumn: {
    flex: 1,
    flexDirection: "column",
  },
});

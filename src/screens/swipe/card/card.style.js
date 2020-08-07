import { StyleSheet } from "react-native";
import { COLOR } from "@config";

export default StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 4,
    justifyContent: "center",
    backgroundColor: COLOR.HEADER_BACKGROUND,
  },
  cardImage: {
    width: "100%",
    flex: 1,
    backgroundColor: COLOR.HEADER_BACKGROUND,
  },
});

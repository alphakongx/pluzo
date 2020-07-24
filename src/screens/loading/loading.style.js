import { StyleSheet } from "react-native";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.HEADER_BACKGROUND,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
});

import { StyleSheet } from "react-native";
import { FontHelper } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    // flex: 1,
  },
  inputField: FontHelper.font({
    height: 35,
    fontSize: 14,
    fontWeight: "bold",
    color: COLOR.TEXT_INPUT,
    paddingVertical: 0,
    paddingHorizontal: 18,
    borderRadius: 18,
    backgroundColor: COLOR.TEXT_INPUT_BACKGROUND,
  }),
});

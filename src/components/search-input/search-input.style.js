import { StyleSheet } from "react-native";
import { FontHelper } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLOR.SEARCH_INPUT_BORDER,
  },
  iconContainer: {
    width: 30,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 5,
    paddingTop: 1,
  },
  inputField: FontHelper.font({
    flex: 1,
    fontSize: 12,
    padding: 0,
    fontWeight: "600",
    color: COLOR.SEARCH_INPUT_PLACEHOLDER,
  }),
});

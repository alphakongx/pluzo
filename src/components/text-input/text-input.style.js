import { Platform, StyleSheet } from "react-native";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    borderRadius: 5,
    height: 56,
    backgroundColor: COLOR.CARD_BACKGROUND,
    borderColor: COLOR.SEARCH_INPUT_BORDER,
    borderWidth: 1,
  },
  touchableInputContainer: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 12,
    paddingRight: 16.96,
    paddingBottom: 5,
    paddingTop: 5,
    justifyContent: "space-between",
  },
  placeholderContainer: {
    position: "absolute",
    right: 0,
    left: 0,
    zIndex: 1,
    flexDirection: "row",
  },
  placeholder: {
    paddingLeft: 1,
    color: COLOR.TEXT_PLACEHOLDER,
  },
  inputFieldContainer: {
    flexDirection: "row",
    flex: 1,
    paddingTop: 20,
  },
  inputField: {
    flex: 1,
    fontSize: 16,
    color: COLOR.TEXT_PRIMARY_2,
    paddingTop: 0,
    paddingBottom: Platform.OS === "android" ? 2 : 5,
  },
  iconContainer: {
    justifyContent: "center",
    paddingLeft: 5,
  },
});

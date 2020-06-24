import { StyleSheet } from "react-native";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.CARD_BACKGROUND,
    borderRadius: 5,
    borderColor: COLOR.SEARCH_INPUT_BORDER,
    borderWidth: 1,
    paddingLeft: 12,
    paddingRight: 16.96,
    paddingVertical: 5,
    minHeight: 56,
    justifyContent: "center",
  },
  disabled: {
    opacity: 0.4,
  },
  disabledOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLOR.TRANSPARENT,
  },
  flexContainer: {
    flex: 1,
    marginRight: 5,
  },
  placeholder: {
    marginBottom: -7,
    fontSize: 12,
    fontWeight: "400",
  },
  placeholderTextColor: {
    color: COLOR.TEXT_PLACEHOLDER,
  },
  required: {
    color: COLOR.WARNING,
  },
  value: {
    fontSize: 16,
    color: COLOR.TEXT_PRIMARY_2,
  },
});

import { StyleSheet } from "react-native";
import { COLOR } from "@config";
import { FontHelper } from "@helpers";

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.MESSAGE_INPUT_TOOLBAR_BACKGROUND,
    borderTopWidth: 1,
    borderTopColor: "#FFFFFF10",
  },
  attachmentsButtonContainer: {
    marginLeft: 10,
  },
  attachmentIcon: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 3,
  },
  inputField: FontHelper.font({
    fontFamily: "OpenSans",
    fontSize: 12,
    color: COLOR.TEXT_INPUT,
    borderRadius: 25,
    marginRight: 10,
    paddingTop: 8,
    paddingLeft: 15,
    paddingRight: 40,
    backgroundColor: "white",
  }),
  sendButton: {
    width: 35,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 10,
    bottom: 0,
  },
  sendButtonIcon: {
    tintColor: COLOR.TEXT_SECONDARY,
  },
});

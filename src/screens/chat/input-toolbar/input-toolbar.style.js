import { StyleSheet, Platform } from "react-native";
import { COLOR } from "@config";
import { FontHelper } from "@helpers";

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.MESSAGE_INPUT_TOOLBAR_BACKGROUND,
    borderTopWidth: 1,
    borderTopColor: "#FFFFFF10",
    paddingTop: 10,
    paddingBottom: Platform.OS === "ios" ? 15 : 5,
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
    marginBottom: Platform.OS === "ios" ? 3 : 6.5,
    marginLeft: 5,
  },
  inputField: FontHelper.font({
    fontFamily: "OpenSans",
    fontSize: 14,
    color: COLOR.TEXT_INPUT,
    borderRadius: 25,
    ...Platform.select({
      ios: {
        marginLeft: 10,
        marginRight: 10,
        paddingLeft: 15,
        paddingRight: 40,
        paddingTop: 10,
        backgroundColor: "white",
        lineHeight: 16,
      },
      android: {
        marginLeft: 10,
        marginRight: 10,
        paddingLeft: 15,
        paddingRight: 40,
        backgroundColor: "white",
        lineHeight: 16,
      },
    }),
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

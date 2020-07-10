import { StyleSheet } from "react-native";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column-reverse",
  },

  inputContainer: {
    flexDirection: "row",
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "white",
    marginHorizontal: 10,
  },
  inputField: {
    flex: 1,
    fontSize: 12,
    fontWeight: "600",
    color: COLOR.TEXT_PRIMARY,
    marginHorizontal: 10,
    padding: 0,
  },
  sendButton: {
    width: 25,
    height: 25,
    alignSelf: "center",
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  sendIcon: {
    width: 15,
    height: 15,
    resizeMode: "contain",
  },

  defaultButtonsContainer: {
    padding: 10,
  },
  defaultButton: {
    backgroundColor: COLOR.LIVE_MSG_BACKGROUND,
    height: 36,
    borderRadius: 18,
    paddingHorizontal: 15,
    justifyContent: "center",
    marginRight: 5,
  },
  defaultButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "400",
  },

  messageList: {
    flex: 1,
    marginHorizontal: 10,
  },
  messageItemContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  messageAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: "absolute",
  },
  messageTextContainer: {
    minHeight: 40,
    marginLeft: 10,
    paddingLeft: 35,
    paddingRight: 20,
    justifyContent: "center",
    backgroundColor: COLOR.LIVE_MSG_BACKGROUND,
    borderRadius: 20,
  },
  messageUser: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  messageText: {
    color: "white",
    fontSize: 12,
    fontWeight: "400",
  },
});

import { StyleSheet } from "react-native";
import { COLOR } from "@config";

export default StyleSheet.create({
  messageContainer: {
    height: 65,
    flexDirection: "row",
  },
  imageContainer: {
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  messageContentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  subject: {
    fontSize: 14,
    fontWeight: "700",
    color: COLOR.TEXT_PRIMARY,
  },
  preview: {
    fontSize: 12,
    fontWeight: "700",
    color: COLOR.MESSAGE_PREVIEW,
  },
  timeContainer: {
    marginHorizontal: 10,
    justifyContent: "center",
  },
  addButton: {
    height: 32,
    width: 65,
  },
  addButtonText: {
    fontFamily: "OpenSans",
    fontSize: 14,
    color: "black",
  },
});

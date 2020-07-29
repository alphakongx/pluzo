import { StyleSheet } from "react-native";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  messageContainer: {
    height: 100,
    flexDirection: "row",
  },
  imageContainer: {
    justifyContent: "center",
    paddingHorizontal: 20,
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
    fontFamily: "OpenSans",
    fontSize: 12,
    fontWeight: "400",
    color: COLOR.MESSAGE_PREVIEW,
    marginTop: 2,
  },
  previewNew: {
    fontWeight: "700",
  },
  timeContainer: {
    flexDirection: "row",
    paddingLeft: 5,
    paddingRight: 10,
  },
  time: {
    marginTop: 35,
    fontSize: 10,
    color: COLOR.TEXT_SECONDARY,
  },
  unread: {
    marginLeft: 5,
    marginTop: 38,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLOR.MESSAGE_UNREAD_ICON,
  },
  separator: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
});

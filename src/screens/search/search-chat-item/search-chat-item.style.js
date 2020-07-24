import { StyleSheet } from "react-native";
import { FontHelper } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  messageContainer: {
    height: 100,
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

  preview: FontHelper.font({
    fontSize: 12,
    fontWeight: "600",
    color: COLOR.MESSAGE_PREVIEW,
    marginTop: 2,
  }),
  previewBold: FontHelper.font({
    fontSize: 12,
    fontWeight: "bold",
    color: COLOR.TEXT_PRIMARY,
    marginTop: 2,
  }),
  timeContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
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

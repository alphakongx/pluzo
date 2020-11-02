import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
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
    height: wp(100),
    flexDirection: "row",
  },
  imageContainer: {
    justifyContent: "center",
    paddingHorizontal: wp(20),
  },
  image: {
    width: wp(50),
    height: wp(50),
    borderRadius: wp(25),
  },
  messageContentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  subject: {
    fontSize: wp(14),
    fontWeight: "700",
    color: COLOR.TEXT_PRIMARY,
  },
  preview: {
    fontFamily: "OpenSans",
    fontSize: wp(12),
    fontWeight: "400",
    color: COLOR.MESSAGE_PREVIEW,
    marginTop: wp(2),
  },
  previewNew: {
    fontWeight: "700",
  },
  timeContainer: {
    flexDirection: "row",
    paddingLeft: wp(5),
    paddingRight: wp(10),
  },
  time: {
    marginTop: wp(35),
    fontSize: wp(10),
    color: COLOR.TEXT_SECONDARY,
  },
  unread: {
    marginLeft: wp(5),
    marginTop: wp(38),
    width: wp(6),
    height: wp(6),
    borderRadius: wp(3),
    backgroundColor: COLOR.MESSAGE_UNREAD_ICON,
  },
  separator: {
    height: wp(1),
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
});

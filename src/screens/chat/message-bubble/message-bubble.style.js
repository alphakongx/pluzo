import { StyleSheet, Dimensions } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    maxWidth: SCREEN_WIDTH * 0.7,
    marginLeft: wp(8),
  },
  containerMargin: {
    marginBottom: wp(10),
  },
  textContainer: {
    borderRadius: wp(22),
    paddingTop: wp(10),
    paddingBottom: wp(12),
  },
  otherUserTextContainer: {
    paddingLeft: wp(14),
    paddingRight: wp(15),
    borderBottomLeftRadius: wp(8),
    backgroundColor: COLOR.MESSAGE_BUBBLE_BACKGROUND,
  },
  currentUserTextContainer: {
    paddingLeft: wp(15),
    paddingRight: wp(18),
    borderBottomRightRadius: wp(8),
    backgroundColor: COLOR.MESSAGE_BUBBLE_BACKGROUND_USER,
  },
  text: {
    fontFamily: "OpenSans",
    fontSize: wp(14),
    fontWeight: "600",
    lineHeight: wp(16),
  },
  otherUserText: {
    color: COLOR.MESSAGE_BUBBLE_TEXT,
  },
  currentUserText: {
    color: COLOR.MESSAGE_BUBBLE_TEXT_USER,
  },
  imageText: {
    top: -wp(18),
    marginBottom: -wp(8),
  },
  messageImage: {
    width: SCREEN_WIDTH * 0.7,
    height: SCREEN_WIDTH * 0.55,
    backgroundColor: COLOR.HEADER_BACKGROUND,
    borderTopLeftRadius: wp(20),
    borderTopRightRadius: wp(20),
    resizeMode: "cover",
  },
  hiddenImage: {
    width: 0,
    height: 0,
  },
  imageFullRound: {
    borderRadius: wp(20),
  },
});

import { StyleSheet, Dimensions } from "react-native";
import { widthPercentageToDP as wp, FontHelper } from "@helpers";
import { COLOR } from "@config";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    maxWidth: SCREEN_WIDTH * 0.7,
    marginLeft: wp(6),
  },
  containerMargin: {
    marginBottom: wp(4),
  },
  containerMarginLarge: {
    marginTop: wp(8),
    marginBottom: wp(4),
  },
  textContainer: {
    borderRadius: wp(22),
    paddingTop: wp(8),
    paddingBottom: wp(10),
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
  text: FontHelper.font({
    fontFamily: "OpenSans",
    fontSize: 16,
    // lineHeight: 18,
    // backgroundColor: "red"
  }),
  otherUserText: {
    color: COLOR.MESSAGE_BUBBLE_TEXT,
  },
  currentUserText: {
    color: COLOR.MESSAGE_BUBBLE_TEXT_USER,
  },
  urlText: {
    textDecorationLine: "underline",
    color: "blue",
  },
  timeText: {
    textAlign: "right",
    alignSelf: "stretch",
    color: "red",
    fontSize: wp(10),
    marginLeft: wp(15),
  },
  imageText: {
    top: -wp(18),
    marginBottom: -wp(8),
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  messageImage: {
    width: SCREEN_WIDTH * 0.7,
    height: SCREEN_WIDTH * 0.55,
    backgroundColor: COLOR.HEADER_BACKGROUND,
    borderTopLeftRadius: wp(20),
    borderTopRightRadius: wp(20),
    resizeMode: "cover",
  },
  imageFullRound: {
    borderRadius: wp(20),
  },
  loadingIndicator: {
    position: "absolute",
  },

  tickContainer: {
    flexDirection: "row-reverse",
  },
  tickView: {
    borderRadius: wp(20),
    width: wp(8),
    height: wp(8),
    justifyContent: "center",
    alignItems: "center",
    marginTop: wp(2),
    marginRight: wp(5),
  },
  tickViewSent: {
    backgroundColor: "#EBE6FF",
  },
  tickViewReceived: {
    backgroundColor: "#02FFF3",
  },
  tick: {
    width: wp(4.4),
    height: wp(3.5),
    color: "black",
  },
  tickPedning: {
    width: wp(6),
    height: wp(6),
    color: "black",
  },
});

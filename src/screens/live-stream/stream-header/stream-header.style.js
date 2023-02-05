import { StyleSheet } from "react-native";
import { FontHelper, widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  flexFill: {
    flex: 1,
  },
  flexRow: {
    flexDirection: "row-reverse",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: wp(10),
  },

  titleContainer: {
    flex: 1,
    height: wp(35),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
    height: wp(35),
    paddingHorizontal: wp(15),
    borderRadius: wp(20),
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
  },
  inputTitle: FontHelper.font({
    paddingVertical: 0,
    color: "white",
    fontWeight: "700",
    fontSize: wp(14),
  }),
  emojiButton: {
    width: wp(77),
    height: wp(35),
    borderRadius: wp(20),
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: wp(10),
    overflow: "hidden",
  },
  emptyCategoryText: {
    color: "#E8E6FF",
    fontWeight: "600",
    fontSize: wp(12),
  },
  emojiCategoryContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    fontSize: wp(10),
    fontWeight: "900",
    color: COLOR.TEXT_PRIMARY,
    textShadowColor: "rgba(255, 255, 255, 0.1)",
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
  },

  userCountStyle: {
    minWidth: wp(50),
    height: wp(26),
    borderRadius: wp(13),
    paddingHorizontal: wp(10),
    marginRight: wp(10),
  },
  userTextStyle: {
    fontWeight: "bold",
    marginLeft: wp(5),
  },
  boostContainer: {
    width: wp(26),
    height: wp(26),
    marginRight: wp(10),
  },
  boostIcon: {
    width: wp(45),
    height: wp(45),
  },

  tutorialContainer: {
    flexDirection: "row",
    backgroundColor: "#0B0516",
    alignItems: "center",
    paddingHorizontal: wp(10),
    paddingVertical: wp(6),
    borderRadius: wp(20),
    marginRight: wp(6),
  },
  tutorialText: {
    fontSize: wp(10),
    fontWeight: "600",
    color: "white",
    marginRight: wp(6),
  },
  tutorialArrow: {
    width: wp(9),
    height: wp(9),
    resizeMode: "contain",
  },

  raisedContainer: {
    flexDirection: "row",
    backgroundColor: "#0B0516",
    alignItems: "center",
    borderRadius: wp(20),
    paddingHorizontal: wp(9),
    paddingVertical: wp(4),
    marginRight: wp(8),
  },
  raisedIcon: {
    width: wp(14),
    height: wp(14),
    resizeMode: "contain",
  },
  raisedText: {
    fontFamily: "OpenSans",
    fontSize: wp(13),
    fontWeight: "700",
    color: "white",
    paddingHorizontal: wp(5),
  },
});

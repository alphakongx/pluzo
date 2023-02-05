import { StyleSheet, Dimensions } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

export const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    borderRadius: wp(22),
    overflow: "hidden",
    marginBottom: wp(20),
  },
  allContainer: {
    height: wp(160) + (width - wp(275)) / 2,
    marginBottom: wp(40),
  },

  trendingText: {
    color: "#E8E6FF",
    fontSize: wp(14),
    fontWeight: "600",
    paddingHorizontal: wp(15),
    paddingVertical: wp(10),
  },
  iconsContainer: {
    paddingLeft: wp(15),
    marginTop: wp(10),
    marginBottom: wp(10),
  },
  emojiButton: {
    height: wp(57),
    borderRadius: wp(12),
    marginRight: (width - wp(275)) / 6,
    marginBottom: wp(10),
    backgroundColor: "#312446",
    justifyContent: "center",
    alignItems: "center",
  },

  itemColorView: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: wp(12),
    justifyContent: "flex-end",
  },
  itemText: {
    fontSize: wp(10),
    fontWeight: "900",
    color: COLOR.TEXT_PRIMARY,
    paddingLeft: wp(7),
    paddingBottom: wp(5),
    textShadowColor: "rgba(255, 255, 255, 0.1)",
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
  },
  itemImage: {
    width: wp(34),
    height: wp(34),
    resizeMode: "contain",
    position: "absolute",
    right: 0,
    top: 0,
  },
  itemImage1: {
    height: wp(20),
    resizeMode: "contain",
    position: "absolute",
    right: -wp(13),
    top: wp(6),
  },
});

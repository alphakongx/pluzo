import { Dimensions, StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

export const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    marginTop: wp(16),
  },

  contentContainer: {
    minHeight: wp(55),
    marginHorizontal: wp(5),
    borderRadius: wp(11),
    backgroundColor: COLOR.HEADER_BACKGROUND,
    paddingHorizontal: wp(15),
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },

  noConnectionIcon: {
    width: wp(35),
    height: wp(30),
  },
  contentText: {
    flex: 1,
    fontFamily: "OpenSans",
    fontSize: wp(11),
    fontWeight: "600",
    color: "white",
    marginHorizontal: wp(10),
  },
  dots: {
    width: wp(9),
    height: wp(9),
    marginHorizontal: wp(2),
    borderRadius: wp(5),
    backgroundColor: "white",
  },
});

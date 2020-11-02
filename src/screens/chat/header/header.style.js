import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  headerContainer: {
    backgroundColor: COLOR.HEADER_BACKGROUND,
  },
  header: {
    height: wp(70),
    flexDirection: "row",
  },
  backButtonContainer: {
    justifyContent: "center",
    paddingHorizontal: wp(10),
  },
  backButtonTouchable: {
    width: wp(35),
    height: wp(35),
    justifyContent: "center",
    alignItems: "center",
  },
  headerContentContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  headerImage: {
    width: wp(50),
    height: wp(50),
    borderRadius: wp(25),
    marginRight: wp(10),
  },
  headerTitle: {
    fontFamily: "OpenSans",
    fontSize: wp(18),
    fontWeight: "700",
    color: COLOR.TEXT_PRIMARY,
  },
  reportButtonContainer: {
    justifyContent: "center",
    paddingHorizontal: wp(10),
  },
  reportButtonTouchable: {
    width: wp(35),
    height: wp(35),
    justifyContent: "center",
    alignItems: "center",
  },
  reportIcon: {
    width: wp(16.67),
    height: wp(20),
    resizeMode: "contain",
  },
});

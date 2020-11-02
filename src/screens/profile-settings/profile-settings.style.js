import { StyleSheet, Dimensions, Platform } from "react-native";
import { FontHelper, widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

export const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  badgeButtonContainer: {
    padding: wp(20),
  },
  chooseBadgeButton: {
    height: wp(35),
  },
  chooseBadgeText: {
    fontSize: wp(14),
  },

  imageContainer: {
    marginHorizontal: wp(20),
  },
  sectionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionText: {
    fontSize: wp(16),
    fontWeight: "bold",
    color: "white",
  },
  imageScrollView: {
    paddingVertical: wp(10),
  },
  imageItem: {
    position: "relative",
  },
  profileImageContainer: {
    paddingTop: wp(10),
  },
  profileImage: {
    width: (width - wp(80)) / 3,
    aspectRatio: 2 / 3,
    borderRadius: wp(22),
    marginLeft: wp(10),
  },
  imageDeleteContainer: {
    position: "absolute",
    top: wp(5),
    right: wp(5),
    backgroundColor: "white",
    width: wp(20),
    height: wp(20),
    borderRadius: wp(10),
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "red",
    width: wp(10),
    height: wp(3),
  },
  imageLoadingContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  addImageButton: {
    width: (width - wp(80)) / 3,
    height: (width - wp(80)) / 2,
    borderWidth: wp(2),
    borderColor: "white",
    borderRadius: wp(22),
    backgroundColor: COLOR.HEADER_BACKGROUND,
    justifyContent: "center",
    alignItems: "center",
    marginTop: wp(10),
  },

  settingsContainer: {
    marginTop: wp(20),
    backgroundColor: COLOR.HEADER_BACKGROUND,
  },
  settingsText: {
    marginHorizontal: wp(20),
    marginTop: wp(20),
    marginBottom: wp(10),
    fontSize: wp(16),
    fontWeight: "bold",
    color: "white",
  },

  bioContainer: {
    backgroundColor: "#211533",
    paddingHorizontal: wp(20),
    paddingVertical: Platform.OS === "ios" ? wp(15) : wp(5),
  },
  bigTextInput: FontHelper.font({
    fontFamily: "OpenSans",
    fontWeight: "400",
    fontSize: wp(14),
    color: COLOR.TEXT_SECONDARY_2,
  }),
  bigTextLength: {
    fontFamily: "OpenSans",
    fontWeight: "400",
    fontSize: wp(14),
    color: COLOR.TEXT_SECONDARY_4,
    textAlign: "right",
  },

  plusContainer: {
    position: "relative",
    alignItems: "center",
    padding: wp(20),
    marginTop: wp(30),
  },
  premiumImage: {
    width: width - wp(40),
    height: ((width - wp(40)) * 169) / 336,
    resizeMode: "stretch",
  },
  buttonContainer: {
    width: width - wp(100),
    marginTop: -wp(25),
  },

  amountsContainer: {
    marginTop: wp(60),
    marginBottom: -wp(30),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  amountSpacer: {
    width: wp(40),
  },
});

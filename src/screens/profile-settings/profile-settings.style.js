import { StyleSheet, Dimensions, Platform } from "react-native";
import { FontHelper } from "@helpers";
import { COLOR } from "@config";

export const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  badgeButtonContainer: {
    padding: 20,
  },
  chooseBadgeButton: {
    height: 35,
  },
  chooseBadgeText: {
    fontSize: 14,
  },

  imageContainer: {
    marginHorizontal: 20,
  },
  sectionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  imageScrollView: {
    marginVertical: 10,
  },
  imageItem: {
    position: "relative",
  },
  profileImage: {
    width: (width - 80) / 3,
    aspectRatio: 2 / 3,
    borderRadius: 22,
    marginLeft: 10,
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
    width: (width - 80) / 3,
    height: (width - 80) / 2,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 22,
    backgroundColor: COLOR.HEADER_BACKGROUND,
    justifyContent: "center",
    alignItems: "center",
  },

  settingsContainer: {
    marginTop: 20,
    backgroundColor: COLOR.HEADER_BACKGROUND,
  },
  settingsText: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  separatorLine: {
    height: 1,
    backgroundColor: "#FFFFFF",
    opacity: 0.15,
  },
  settingsItem: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  bioContainer: {
    backgroundColor: "#211533",
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === "ios" ? 15 : 5,
  },
  bigTextInput: FontHelper.font({
    fontFamily: "OpenSans",
    fontWeight: "400",
    fontSize: 14,
    color: COLOR.TEXT_SECONDARY_2,
  }),
  bigTextLength: {
    fontFamily: "OpenSans",
    fontWeight: "400",
    fontSize: 14,
    color: COLOR.TEXT_SECONDARY_4,
    textAlign: "right",
  },

  plusContainer: {
    position: "relative",
    alignItems: "center",
    padding: 20,
  },
  premiumImage: {
    width: width - 40,
    height: ((width - 40) * 169) / 336,
    resizeMode: "stretch",
  },
  buttonContainer: {
    width: width - 100,
    marginTop: -25,
  },
});

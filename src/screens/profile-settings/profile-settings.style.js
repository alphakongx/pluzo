import { StyleSheet, Dimensions } from "react-native";
import { COLOR } from "@config";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 50,
  },
  chooseBadgeButton: {
    margin: 20,
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
  profileImage: {
    width: (width - 80) / 3,
    aspectRatio: 2 / 3,
    borderRadius: 22,
    marginRight: 10,
  },
  addImageButton: {
    width: (width - 80) / 3,
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

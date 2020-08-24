import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  backButtonContainer: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    paddingTop: (height / 100) * 18,
    paddingHorizontal: 37,
  },
  titleText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  subTitleText: {
    fontSize: 16,
    color: "#ABA7D5",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 25,
  },
  imageUploadContainer: {
    width: 180,
    justifyContent: "center",
    alignSelf: "center",
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "white",
    alignSelf: "center",
    marginHorizontal: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  imageSeparator: {
    height: 25,
  },
  footer: {
    paddingHorizontal: 37,
    paddingBottom: 40,
  },
});

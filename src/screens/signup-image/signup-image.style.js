import { StyleSheet, Dimensions } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

const { height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  backButtonContainer: {
    width: wp(60),
    height: wp(60),
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    paddingTop: (height / 100) * 18,
    paddingHorizontal: wp(37),
  },
  titleText: {
    fontSize: wp(20),
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  subTitleText: {
    fontSize: wp(16),
    color: "#ABA7D5",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: wp(25),
  },
  imageUploadContainer: {
    width: wp(180),
    justifyContent: "center",
    alignSelf: "center",
  },
  imageContainer: {
    width: wp(150),
    height: wp(150),
    borderRadius: wp(75),
    backgroundColor: "white",
    alignSelf: "center",
    marginHorizontal: wp(25),
    justifyContent: "center",
    alignItems: "center",
  },
  imageSeparator: {
    height: wp(25),
  },
  footer: {
    paddingHorizontal: wp(37),
    paddingBottom: wp(40),
  },
});

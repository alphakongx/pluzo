import { StyleSheet, Dimensions } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export const screenWidth = Dimensions.get("window").width;

export default StyleSheet.create({
  flexFill: {
    flex: 1,
  },
  container: {
    alignItems: "center",
  },
  imageBackground: {
    width: screenWidth - wp(40),
    height: ((screenWidth - wp(40)) * 480) / 335,
    resizeMode: "contain",
    justifyContent: "space-between",
  },
  priceText: {
    fontFamily: "OpenSans",
    fontSize: wp(10),
    color: "white",
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
    marginBottom: wp(30),
    alignSelf: "center",
  },
  buttonContainer: {
    width: screenWidth - wp(90),
    marginTop: -wp(25),
    color: "white",
  },
});

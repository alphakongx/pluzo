import { StyleSheet, Dimensions } from "react-native";

export const screenWidth = Dimensions.get("window").width;

export default StyleSheet.create({
  flexFill: {
    flex: 1,
  },
  container: {
    alignItems: "center",
  },
  imageBackground: {
    width: screenWidth - 40,
    height: ((screenWidth - 40) * 480) / 335,
    resizeMode: "contain",
    justifyContent: "space-between",
  },
  priceText: {
    fontFamily: "OpenSans",
    fontSize: 10,
    color: "white",
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
    marginBottom: 30,
    alignSelf: "center",
  },
  buttonContainer: {
    width: screenWidth - 90,
    marginTop: -25,
    color: "white",
  },
});

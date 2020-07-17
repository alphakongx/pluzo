import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
export default StyleSheet.create({
  flexFill: {
    flex: 1,
  },
  container: {
    alignItems: "center",
  },
  imageBackground: {
    width: screenWidth - 30,
    height: ((screenWidth - 30) * 480) / 355,
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

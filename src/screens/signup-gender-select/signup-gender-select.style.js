import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    paddingBottom: 20,
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
    marginBottom: 70,
  },
  selectionContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  buttonSeparator: {
    width: 30,
  },
  footer: {
    marginBottom: 20,
    paddingHorizontal: 37,
  },
});

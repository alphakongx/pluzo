import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
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
    justifyContent: "center",
    paddingHorizontal: 37,
  },
  titleFieldContainer: {
    flex: 1,
    paddingTop: (height / 100) * 18,
  },
  titleText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 68,
  },
  inputFieldSeparator: {
    marginBottom: 24,
  },
  buttonContainer: {
    marginBottom: 20,
  },
});

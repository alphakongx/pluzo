import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    justifyContent: "center",
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
    paddingHorizontal: 37,
    paddingTop: (height / 100) * 18,
  },
  titleText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 45,
  },
  inputFieldSeparator: {
    height: 20,
  },
  informationContainer: {
    alignItems: "center",
    marginTop: 25,
  },
  passwordRequirementTitle: {
    fontFamily: "OpenSans",
    fontSize: 12,
    color: "#ABA7D5",
    textDecorationLine: "underline",
  },
  passwordRequirement: {
    marginTop: 3,
    fontFamily: "OpenSans",
    fontSize: 12,
    color: "#ABA7D5",
  },
  instructionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  instructionInvalidIcon: {
    width: 7,
    height: 7,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ABA7D5",
    marginTop: 3,
    marginRight: 5,
  },
  instructionValidIcon: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#00FF6F",
    marginTop: 3,
    marginRight: 5,
  },
  footer: {
    marginTop: 40,
    paddingHorizontal: 37,
    paddingBottom: 20,
  },
});

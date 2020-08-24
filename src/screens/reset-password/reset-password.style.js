import { StyleSheet } from "react-native";

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
    justifyContent: "center",
    paddingHorizontal: 37,
    marginTop: -30,
  },
  titleText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 64,
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
    color: "rgba(255, 255, 255, 0.5)",
    textDecorationLine: "underline",
  },
  passwordRequirement: {
    marginTop: 3,
    fontFamily: "OpenSans",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.5)",
  },
  instructionContainer: {
    flexDirection: "row",
    alignItems: "center",
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

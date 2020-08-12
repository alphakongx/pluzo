import { StyleSheet } from "react-native";

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
    flexDirection: "column-reverse",
    justifyContent: "center",
    paddingHorizontal: 37,
  },
  titleText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 100,
  },
  phoneContainer: {
    flexDirection: "row",
  },
  phoneLabel: {
    fontFamily: "OpenSans",
    textAlign: "center",
    fontSize: 8,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.5)",
    height: 20,
  },
  phoneCodeContainer: {
    width: 70,
  },
  phoneNumberContainer: {
    paddingTop: 20,
    flex: 3,
  },
  phoneSeparator: {
    width: 15,
  },
  informationContainer: {
    alignItems: "center",
    marginTop: 25,
  },
  passwordRequirementTitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.5)",
    textDecorationLine: "underline",
  },
  instructionText: {
    fontFamily: "OpenSans",
    textAlign: "center",
    marginTop: 3,
    fontSize: 14,
    fontWeight: "400",
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

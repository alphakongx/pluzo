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
    paddingTop: 20,
    paddingHorizontal: 37,
    justifyContent: "center",
  },
  titleText: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  subTitleText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.5)",
    fontWeight: "600",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 45,
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  codeContentContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  codeInputStyle: {
    backgroundColor: "white",
    width: 58,
    height: 42,
    color: "#9892A3",
    borderRadius: 25,
  },
  informationContainer: {
    alignItems: "center",
    marginTop: 25,
  },
  instructionText: {
    textAlign: "center",
    marginTop: 3,
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
  },
  instructionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  resendButtonContainer: {
    width: 200,
    marginTop: 10,
    marginBottom: 10,
  },
  footer: {
    marginTop: 40,
    paddingHorizontal: 37,
    paddingBottom: 20,
  },
});

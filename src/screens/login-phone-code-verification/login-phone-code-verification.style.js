import { StyleSheet } from "react-native";
import { FontHelper } from "@helpers";
import { COLOR } from "@config";

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
    paddingTop: 120,
    paddingHorizontal: 37,
    marginTop: -20,
  },
  titleText: {
    fontSize: 20,
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
    marginBottom: 40,
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  codeContentContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  codeInputStyle: FontHelper.font({
    backgroundColor: "white",
    width: 58,
    height: 35,
    borderRadius: 25,
    color: COLOR.TEXT_INPUT,
    fontSize: 14,
    fontWeight: "600",
    paddingVertical: 0,
  }),
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
    paddingBottom: 40,
  },
});

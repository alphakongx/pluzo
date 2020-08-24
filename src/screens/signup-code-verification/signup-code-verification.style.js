import { StyleSheet, Dimensions } from "react-native";
import { FontHelper } from "@helpers";
import { COLOR } from "@config";

const { height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
  },
  backButtonContainer: {
    width: 35,
    height: 35,
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
  },
  subTitleText: {
    fontSize: 16,
    color: "#ABA7D5",
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
    color: COLOR.TEXT_INPUT,
    borderRadius: 25,
    fontSize: 14,
    fontWeight: "600",
    paddingVertical: 0,
  }),
  informationContainer: {
    alignItems: "center",
    marginTop: 35,
  },
  instructionText: {
    textAlign: "center",
    marginTop: 3,
    fontSize: 14,
    color: "#ABA7D5",
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
    paddingHorizontal: 37,
    paddingBottom: 40,
  },
});

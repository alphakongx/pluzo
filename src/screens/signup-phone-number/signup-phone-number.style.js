import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

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
    flexDirection: "column-reverse",
    paddingTop: (height / 100) * 18,
    paddingHorizontal: 37,
  },
  titleText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
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
    color: "#ABA7D5",
    textDecorationLine: "underline",
  },
  instructionText: {
    fontFamily: "OpenSans",
    textAlign: "center",
    marginTop: 3,
    fontSize: 14,
    fontWeight: "400",
    color: "#ABA7D5",
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
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 37,
    paddingBottom: 40,
  },
});

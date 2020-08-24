import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredContentContainer: {
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: 37,
    marginTop: -30,
  },
  titleText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 18,
  },
  inputFieldSeparator: {
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 25,
  },
  orText: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  forgotPasswordContainer: {
    marginTop: 25,
    alignItems: "center",
  },
  forgotPasswordText: {
    fontFamily: "OpenSans",
    fontSize: 12,
    color: "white",
    textDecorationLine: "underline",
  },
});

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    height: 35,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.25,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  buttonTextDisabled: {
    color: "rgba(200, 200, 200, 1)",
  },
});

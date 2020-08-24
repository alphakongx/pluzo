import { StyleSheet } from "react-native";

export default StyleSheet.create({
  flexFill: {
    flex: 1,
  },

  container: {
    borderRadius: 22,
  },

  questionText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 30,
    paddingBottom: 42,
  },

  separator: {
    height: 1,
    backgroundColor: "white",
    opacity: 0.15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
  },
  logoutText: {
    color: "#ABA7D5",
    fontFamily: "OpenSans",
    fontSize: 16,
    paddingLeft: 10,
  },
  buttonIcon: {
    width: 15,
    height: 18,
    resizeMode: "contain",
  },
  cancelText: {
    color: "white",
    fontFamily: "OpenSans",
    fontSize: 16,
  },
});

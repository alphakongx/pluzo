import { StyleSheet } from "react-native";
import { COLOR } from "@config";

export default StyleSheet.create({
  flexFill: {
    flex: 1,
  },
  container: {
    borderRadius: 22,
  },
  headerContainer: {
    paddingRight: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  requestContainer: {
    backgroundColor: COLOR.SEARCH_INPUT_BORDER,
    height: 26,
    paddingHorizontal: 10,
    borderRadius: 13,
    justifyContent: "center",
  },
  requestText: {
    fontWeight: "600",
    color: "white",
    fontSize: 12,
  },

  contentContainer: {
    paddingTop: 30,
    paddingBottom: 50,
    alignItems: "center",
  },
  titleText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  noteText: {
    fontWeight: "600",
    color: COLOR.TEXT_SECONDARY_4,
    fontSize: 14,
    textAlign: "center",
  },
  inputContainer: {
    marginTop: 30,
    marginBottom: 20,
    paddingHorizontal: 30,
    width: "100%",
  },
  buttonContainer: {
    width: 70,
  },
  addButton: {
    height: 35,
    marginBottom: 10,
  },
  addButtonText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "black",
  },
  successText: {
    fontFamily: "OpenSans",
    fontSize: 12,
    color: "#00FF77",
  },
  failText: {
    fontFamily: "OpenSans",
    fontSize: 12,
    color: COLOR.TEXT_SECONDARY_5,
  },
});

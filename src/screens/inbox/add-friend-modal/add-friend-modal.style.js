import { StyleSheet } from "react-native";
import { COLOR } from "@config";
import { FontHelper } from "@helpers";

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
  usernameInput: FontHelper.font({
    height: 35,
    borderRadius: 18,
    paddingHorizontal: 18,
    backgroundColor: "white",
    color: "black",
    fontSize: 14,
    fontWeight: "600",
  }),
  buttonContainer: {
    width: 60,
  },
  addButton: {
    height: 25,
    marginBottom: 10,
  },
  addButtonText: {
    fontFamily: "OpenSans",
    fontWeight: "700",
    fontSize: 12,
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

  subtitleText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 35,
    marginHorizontal: 30,
    alignSelf: "flex-start",
  },
  peopleList: {
    marginTop: 8,
    paddingLeft: 30,
    paddingRight: 15,
  },
  peopleContainer: {
    flex: 1,
    flexDirection: "row",
  },
});

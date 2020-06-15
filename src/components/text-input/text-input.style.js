import { Platform, StyleSheet } from "react-native";
import { FontHelper } from "@helpers";

export default StyleSheet.create({
  container: {
    borderRadius: 50,
    height: 45,
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 1,
  },
  touchableInputContainer: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 16,
    paddingRight: 16.96,
    paddingBottom: 2,
    paddingTop: 2,
    justifyContent: "space-between",
  },
  placeholderContainer: {
    position: "absolute",
    right: 0,
    left: 0,
    zIndex: 1,
    flexDirection: "row",
  },
  placeholder: FontHelper.font({
    paddingLeft: 1,
    fontSize: 14,
    fontWeight: "700",
    color: "#9892A3",
  }),
  inputFieldContainer: {
    flexDirection: "row",
    flex: 1,
    paddingTop: 20,
  },
  inputField: FontHelper.font({
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "black",
    paddingTop: 0,
    paddingBottom: Platform.OS === "android" ? 2 : 5,
  }),
  iconContainer: {
    justifyContent: "center",
    paddingLeft: 5,
  },
});

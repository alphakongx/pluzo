import { StyleSheet } from "react-native";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "white",
  },
  inputField: {
    flex: 1,
    fontSize: 12,
    fontWeight: "600",
    color: COLOR.TEXT_PRIMARY,
    marginHorizontal: 10,
    padding: 0,
  },
  sendButton: {
    width: 25,
    height: 25,
    alignSelf: "center",
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  sendIcon: {
    width: 15,
    height: 15,
    resizeMode: "contain",
  },
  gameIcon: {
    marginHorizontal: 10,
    width: 40,
    height: 20,
    resizeMode: "contain",
  },
  settingIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});

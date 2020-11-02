import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: wp(10),
    alignItems: "center",
  },
  flexFill: {
    flex: 1,
  },
  inputContainer: {
    flex: 1,
    height: wp(36),
    borderRadius: wp(18),
    borderWidth: wp(2),
    borderColor: "white",
  },
  inputField: {
    flex: 1,
    fontSize: wp(12),
    fontWeight: "600",
    color: COLOR.TEXT_PRIMARY,
    marginLeft: wp(10),
    marginRight: wp(30),
    padding: 0,
  },
  sendButton: {
    width: wp(25),
    height: wp(25),
    position: "absolute",
    top: wp(2.5),
    right: wp(5),
    alignItems: "center",
    justifyContent: "center",
  },
  sendIcon: {
    width: wp(15),
    height: wp(15),
    resizeMode: "contain",
  },
  gameIcon: {
    marginHorizontal: wp(10),
    width: wp(40),
    height: wp(20),
    resizeMode: "contain",
  },
  settingIcon: {
    width: wp(20),
    height: wp(20),
    resizeMode: "contain",
  },

  handButton: {
    paddingLeft: wp(10),
  },
  handIcon: {
    width: wp(20),
    height: wp(20),
    resizeMode: "contain",
  },
});

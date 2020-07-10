import { StyleSheet } from "react-native";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.HEADER_BACKGROUND,
  },
  safeAreaContainer: {
    flex: 1,
  },

  headerContainer: {
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  backButton: {
    width: 30,
    height: 50,
    justifyContent: "center",
  },
  backButtonIcon: {
    width: 12,
    height: 18,
    resizeMode: "contain",
  },

  settingText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginHorizontal: 20,
    marginBottom: 10,
  },

  itemContainer: {
    paddingHorizontal: 20,
    height: 50,
    backgroundColor: COLOR.SETTING_ITEM_BACKGROUND,
  },
  separatorLine: {
    height: 1,
    backgroundColor: "white",
    opacity: 0.15,
  },
  emptyItemContainer: {
    height: 45,
    backgroundColor: "transparent",
  },
  itemContainer1: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  logoutText: {
    fontFamily: "OpenSans",
    fontSize: 12,
    color: COLOR.TEXT_SECONDARY_4,
    marginHorizontal: 10,
  },
  deleteText: {
    fontFamily: "OpenSans",
    fontSize: 12,
    color: COLOR.SETTING_ITEM_DELETE_TEXT,
    marginHorizontal: 10,
  },
});

import { StyleSheet } from "react-native";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  safeAreaContainer: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    marginBottom: 50,
  },
  header: {
    flexDirection: "row",
    height: 70,
    paddingHorizontal: 20,
  },
  searchFieldContainer: {
    flex: 1,
    flexDirection: "row",
    height: 35,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: COLOR.SEARCH_INPUT_BORDER,
    alignItems: "center",
    alignSelf: "center",
  },
  searchIconContainer: {
    width: 30,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 5,
    paddingTop: 1,
  },
  searchText: {
    flex: 1,
    fontSize: 12,
    padding: 0,
    fontWeight: "600",
    color: COLOR.SEARCH_INPUT_TEXT,
  },
  newChatIconContainer: {
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    marginTop: 20,
  },
});

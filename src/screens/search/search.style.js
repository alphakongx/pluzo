import { StyleSheet } from "react-native";
import { FontHelper } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    height: 40,
    marginRight: 20,
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLOR.SEARCH_INPUT_BORDER,
  },
  iconContainer: {
    width: 30,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 5,
    paddingTop: 1,
  },
  inputField: FontHelper.font({
    flex: 1,
    fontSize: 12,
    padding: 0,
    fontWeight: "600",
    color: COLOR.SEARCH_INPUT_PLACEHOLDER,
  }),

  filterContainer: {
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  filterButtonContainer: {
    height: 25,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  activeButton: {
    borderRadius: 13,
    backgroundColor: "#312446",
  },
  separator: {
    width: 10,
  },
  filterText: {
    fontWeight: "600",
    fontSize: 12,
    color: COLOR.TEXT_SECONDARY_4,
  },

  sectionContainer: {},
  sectionText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
    paddingHorizontal: 10,
  },
  showAllContainer: {
    margin: 20,
  },
  showAllText: {
    fontFamily: "OpenSans",
    fontSize: 13,
    color: COLOR.TEXT_SECONDARY_4,
  },
});

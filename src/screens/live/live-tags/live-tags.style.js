import { StyleSheet } from "react-native";
import { COLOR } from "@config";

export default StyleSheet.create({
  usersList: {
    marginTop: 0,
    marginBottom: 20,
  },
  usersListContentContainerStyle: {
    paddingHorizontal: 10,
  },
  itemSeparator: {
    width: 10,
  },
  itemContainer: {
    justifyContent: "center",
  },
  itemTextContainer: {
    width: 50,
    height: 30,
    marginRight: 10,
    borderWidth: 2,
    borderRadius: 18,
    borderColor: COLOR.SEARCH_INPUT_BORDER,
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLOR.TEXT_PRIMARY,
  },
  itemImageContainer: {
    width: 36,
    height: 36,
    marginRight: 10,
    borderWidth: 2,
    borderRadius: 18,
    borderColor: COLOR.SEARCH_INPUT_BORDER,
    justifyContent: "center",
    alignItems: "center",
  },
  itemImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  activeItem: {
    backgroundColor: COLOR.SEARCH_INPUT_BORDER,
  },
});

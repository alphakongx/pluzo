import { StyleSheet } from "react-native";
import { COLOR } from "@config";

export default StyleSheet.create({
  usersList: {
    marginTop: 0,
    minHeight: 50,
  },
  usersListContentContainerStyle: {
    paddingHorizontal: 10,
  },
  itemSeparator: {
    width: 10,
  },
  itemContainer: {
    padding: 5,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: COLOR.LIVE_USER_BORDER,
    backgroundColor: "#0000",
  },
});

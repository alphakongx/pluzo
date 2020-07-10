import { StyleSheet } from "react-native";
import { COLOR } from "@config";

export default StyleSheet.create({
  usersList: {
    marginTop: 0,
  },
  usersListContentContainerStyle: {
    paddingHorizontal: 10,
  },
  itemSeparator: {
    width: 10,
  },
  itemContainer: {
    paddingRight: 10,
    paddingBottom: 5,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: COLOR.LIVE_USER_BORDER,
  },
});

import { StyleSheet } from "react-native";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  headerTitleContainer: {
    flexDirection: "row",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLOR.TEXT_PRIMARY,
  },
  onlineIconContainer: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLOR.FRIEND_ONLINE_ICON_BACKGROUND,
    justifyContent: "center",
    alignItems: "center",
  },
  onlineIcon: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },

  searchContainer: {
    height: 35,
  },
  searchInput: {
    borderWidth: 0,
  },
});

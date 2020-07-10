import { StyleSheet } from "react-native";
import { COLOR } from "@config";

export default StyleSheet.create({
  header: {
    flexDirection: "row-reverse",
    height: 60,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  headerButtonTouchable: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitleContainer: {
    flex: 1,
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
});

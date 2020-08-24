import { StyleSheet } from "react-native";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row-reverse",
  },
  flexFill: {
    flex: 1,
  },
  safeAreaContainer: {
    width: 250,
    paddingHorizontal: 10,
  },

  // header
  header: {
    flexDirection: "row-reverse",
    height: 60,
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

  scrollView: {
    marginTop: 15,
    flex: 1,
  },
  flexRow: {
    flexDirection: "row",
    marginVertical: 15,
    alignItems: "center",
  },
  streamerMark: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLOR.LIVE_USER_BORDER,
  },
  streamerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLOR.TEXT_PRIMARY,
    paddingHorizontal: 5,
  },
  userContainer: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  nameTextContainer: {
    marginLeft: 5,
  },
  nameText: {
    fontSize: 14,
    fontWeight: "700",
    color: COLOR.TEXT_PRIMARY,
    paddingHorizontal: 5,
  },
  usernameText: {
    fontSize: 10,
    fontWeight: "700",
    color: COLOR.TEXT_SECONDARY_4,
    paddingHorizontal: 5,
  },
});

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  userContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  absoluteFill: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginHorizontal: 10,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginRight: 5,
  },
  badgeImage: {
    width: 14,
    height: 14,
  },
  usernameText: {
    fontSize: 14,
    fontWeight: "700",
    color: "white",
    marginTop: -2,
  },
  friendsContainer: {
    height: 26,
    borderRadius: 13,
    paddingHorizontal: 10,
    marginTop: 8,
  },
  friendsIconImage: {
    width: 12,
    height: 12,
  },
  friendsCountText: {
    fontSize: 10,
    fontWeight: "bold",
    marginLeft: 5,
  },
});

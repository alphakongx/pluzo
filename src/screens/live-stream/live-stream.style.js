import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  streamPlayer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  safeAreaContainer: {
    flex: 1,
  },
  topBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#000000",
    opacity: 0.6,
    justifyContent: "center",
    alignItems: "center",
  },
  userCountStyle: {
    minWidth: 50,
    height: 26,
    borderRadius: 13,
    paddingHorizontal: 10,
  },
  userTextStyle: {
    fontWeight: "bold",
    marginLeft: 5,
  },

  // Stream Users
  streamUserContainer: {
    width: 70,
    marginTop: -10,
    alignSelf: "flex-end",
    paddingHorizontal: 10,
  },
  streamUser: {
    marginBottom: 10,
  },

  // Messages
  messageBox: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    height: "50%",
  },

  // all users
  usersContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: "row-reverse",
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

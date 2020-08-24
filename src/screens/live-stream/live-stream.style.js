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

  opacityFill: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#0B0516",
    opacity: 0.3,
  },
  opacityBottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 200,
  },

  // Stream Users
  streamUserContainer: {
    width: 70,
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

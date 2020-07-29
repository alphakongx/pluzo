import { StyleSheet } from "react-native";

export default StyleSheet.create({
  headerContainer: {
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  backButton: {
    width: 30,
    height: 50,
    justifyContent: "center",
  },
  backButtonIcon: {
    width: 12,
    height: 18,
    resizeMode: "contain",
  },

  settingText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginHorizontal: 20,
    marginBottom: 10,
  },
});

import { StyleSheet } from "react-native";
import { FontHelper } from "@helpers";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#000000",
    opacity: 0.6,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },

  titleContainer: {
    flex: 1,
    height: 35,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 15,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
  },
  titleText: FontHelper.font({
    paddingVertical: 0,
    color: "white",
    fontWeight: "700",
    fontSize: 14,
  }),

  userCountStyle: {
    minWidth: 50,
    height: 26,
    borderRadius: 13,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  userTextStyle: {
    fontWeight: "bold",
    marginLeft: 5,
  },
});

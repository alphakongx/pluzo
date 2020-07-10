import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  itemTextContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    fontFamily: "OpenSans",
    fontSize: 14,
    color: "white",
  },
  fullWidth: {
    flex: 1,
  },
  verifyBadge: {
    width: 17,
    height: 17,
    borderRadius: 8.5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 3,
  },
});

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  titleText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    paddingHorizontal: 20,
    top: -10,
  },

  itemContainer: {
    flexDirection: "row",
    height: 36,
    paddingLeft: 10,
    paddingRight: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  sortSelection: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  sortNoSelection: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E8E6FF",
  },
  itemText: {
    flex: 1,
    color: "white",
    fontFamily: "OpenSans",
    fontSize: 14,
  },
  flagIcon: {
    width: 15,
    height: 15,
    resizeMode: "contain",
    marginHorizontal: 8,
  },

  seperator: {
    height: 1,
    backgroundColor: "white",
    opacity: 0.15,
  },
});

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  contentContainer: {
    flex: 1,
    paddingTop: 10,
  },

  filterContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 250,
  },
  titleText: {
    color: "white",
    fontSize: 22,
    fontWeight: "600",
    paddingHorizontal: 10,
    paddingVertical: 17,
  },
  subTitleText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 10,
    paddingVertical: 3,
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
  countryName: {
    color: "#E8E6FF",
    fontFamily: "OpenSans",
    fontSize: 12,
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
    marginTop: 20,
    marginBottom: 50,
  },
});

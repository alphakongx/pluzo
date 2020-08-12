import { StyleSheet } from "react-native";

export default StyleSheet.create({
  peopleContainer: {
    marginRight: 15,
    alignItems: "center",
    paddingBottom: 12,
    borderRadius: 22,
    overflow: "hidden",
  },
  peoplePicture: {
    width: 120,
    height: 160,
    borderRadius: 22,
  },
  peopleNameContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  peopleName: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  onlineMark: {
    width: 5,
    height: 5,
    marginTop: 2,
    marginLeft: 2,
    borderRadius: 3,
    backgroundColor: "#00FF77",
  },
  peopleAddContainer: {
    position: "absolute",
    bottom: 0,
  },
  peopleAdd: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  plusIcon: {
    width: 16,
    height: 16,
    resizeMode: "contain",
    tintColor: "#0B0516",
  },
});

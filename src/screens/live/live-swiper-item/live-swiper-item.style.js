import { StyleSheet, Dimensions } from "react-native";
import { COLOR } from "@config";

const screenWidth = Dimensions.get("screen").width;

export default StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 15,
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 10,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    overflow: "hidden",
  },
  userImage: {
    width: (screenWidth - 20) / 4,
    height: (screenWidth - 20) / 4,
  },

  dataContainer: {
    position: "absolute",
    left: 10,
    right: 10,
    top: 0,
    bottom: 0,
    borderRadius: 22,
    padding: 15,
    flexDirection: "column-reverse",
  },

  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLOR.TEXT_PRIMARY,
    paddingRight: 15,
  },
  tagContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  membersContainer: {
    height: 18,
    flexDirection: "row",
    paddingHorizontal: 6,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  memberIcon: {
    width: 12,
    height: 12,
    resizeMode: "contain",
  },
  memberCount: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLOR.TEXT_INPUT,
    paddingLeft: 2,
  },
  tagImage: {
    width: 13,
    height: 13,
    marginRight: 5,
  },
});

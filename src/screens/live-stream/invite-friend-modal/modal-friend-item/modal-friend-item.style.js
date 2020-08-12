import { StyleSheet } from "react-native";
import { COLOR } from "@config";

export default StyleSheet.create({
  itemContainer: {
    height: 50,
    marginTop: 10,
    paddingHorizontal: 15,
    flex: 1,
    flexDirection: "row",
  },
  imageContainer: {
    justifyContent: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  itemContentContainer: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  subject: {
    fontSize: 14,
    fontWeight: "600",
    color: COLOR.TEXT_PRIMARY,
  },
  preview: {
    fontSize: 10,
    fontWeight: "600",
    color: COLOR.MESSAGE_PREVIEW,
  },
  timeContainer: {
    marginHorizontal: 10,
    justifyContent: "center",
  },
  addButton: {
    height: 25,
    width: 60,
  },
  addButtonText: {
    fontFamily: "OpenSans",
    fontWeight: "700",
    fontSize: 12,
    color: "black",
    lineHeight: 20,
  },
});

import { StyleSheet, Dimensions, Platform } from "react-native";
import { COLOR } from "@config";

const { height} = Dimensions.get("window");

export default StyleSheet.create({
  modalContainer: {
    justifyContent: "flex-end",
    margin: 0,
  },
  flexFill: {
    flex: 1,
  },
  container: {
    flexDirection: "column",
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLOR.HEADER_BACKGROUND,
    top: 20,
    marginLeft: 20,
    zIndex: 9999,
    justifyContent: "center",
    alignItems: "center",
  },
  backImage: {
    width: 17,
    height: 12,
    resizeMode: "contain",
  },

  contentContainer: {
    marginTop: 50,
  },

  scrollView: {
    maxHeight: height * 0.8,
  },

  searchContainer: {
    marginVertical: 10,
    marginHorizontal: 15,
    borderWidth: 0,
    height: 35,
  },

  titleText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
    marginHorizontal: 15,
  },
  subtitleText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 20,
    marginHorizontal: 15,
  },

  peopleList: {
    marginTop: 8,
    paddingHorizontal: 15,
  },
});

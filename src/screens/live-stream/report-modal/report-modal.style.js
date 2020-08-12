import { StyleSheet, Dimensions, Platform } from "react-native";
import { COLOR } from "@config";
import { FontHelper } from "@helpers";

const screenWidth = Dimensions.get("window").width;

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
    marginHorizontal: 15,
    marginTop: 50,
  },

  scrollView: {
    maxHeight: Dimensions.get("window").height * 0.8,
  },

  titleText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
  },
  descriptionText: {
    color: "#ABA7D5",
    fontWeight: "600",
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 10,
  },

  typeButton: {
    height: 35,
    backgroundColor: "#E8E6FF",
    borderRadius: 16,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  typeButtonSelect: {
    backgroundColor: "#617FFF"
  },
  typeButtonText: {
    color: "#0B0516",
    fontWeight: "600",
    fontSize: 12,
  },

  reportContentText: FontHelper.font({
    borderRadius: 22,
    height: 80,
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: "#312446",
    paddingHorizontal: 15,
    paddingTop: 10,
    fontSize: 10,
    color: "#ABA7D5",
    textAlignVertical: "top",
  }),

  reportButton: {
    height: 35,
    backgroundColor: "#E8E6FF",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  reportButtonText: {
    color: "#0B0516",
    fontWeight: "bold",
    fontSize: 16,
  },
});

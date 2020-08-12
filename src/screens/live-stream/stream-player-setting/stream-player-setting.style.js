import { StyleSheet, Dimensions } from "react-native";
import { COLOR } from "@config";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    overflow: "visible",
  },

  contentContainer: {
    alignItems: "center",
  },

  backButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLOR.HEADER_BACKGROUND,
    top: 15,
    zIndex: 9999,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  backImage: {
    width: 17,
    height: 12,
    resizeMode: "contain",
    tintColor: "#ABA7D5",
  },

  buttonContainer: {
    flexDirection: "row",
    paddingVertical: 30,
  },
  button: {
    width: width / 5,
  },
  buttonCircle: {
    flex: 1,
    marginHorizontal: 10,
    aspectRatio: 1,
    backgroundColor: "#312446",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "OpenSans",
    fontSize: 10,
    color: "white",
    textAlign: "center",
    marginTop: 10,
  },
  markCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    position: "absolute",
    right: 12,
  },

});

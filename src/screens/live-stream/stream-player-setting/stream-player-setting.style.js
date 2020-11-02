import { StyleSheet, Dimensions } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
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
    width: wp(30),
    height: wp(30),
    borderRadius: wp(15),
    backgroundColor: COLOR.HEADER_BACKGROUND,
    top: wp(15),
    zIndex: 9999,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  backImage: {
    width: wp(17),
    height: wp(12),
    resizeMode: "contain",
    tintColor: "#ABA7D5",
  },

  buttonContainer: {
    flexDirection: "row",
    paddingVertical: wp(30),
  },
  button: {
    width: width / 5,
  },
  buttonCircle: {
    flex: 1,
    marginHorizontal: wp(10),
    aspectRatio: 1,
    backgroundColor: "#312446",
    borderRadius: wp(100),
    justifyContent: "center",
    alignItems: "center",
  },
  buttonCircleRed: {
    backgroundColor: "#FF0036",
  },
  buttonCircleGreen: {
    backgroundColor: "#00FF77",
  },
  buttonText: {
    fontFamily: "OpenSans",
    fontSize: wp(10),
    color: "white",
    textAlign: "center",
    marginTop: wp(10),
  },
  markCircle: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    position: "absolute",
    right: wp(12),
  },
});

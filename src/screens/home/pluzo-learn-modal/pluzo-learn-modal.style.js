import { StyleSheet, Dimensions } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export const screenWidth = Dimensions.get("window").width;

export default StyleSheet.create({
  flexFill: {
    flex: 1,
  },
  container: {
    alignItems: "center",
  },

  questionText: {
    fontWeight: "600",
    fontSize: wp(16),
    color: "white",
    marginBottom: wp(20),
  },

  premiumView: {
    width: screenWidth - wp(40),
    height: ((screenWidth - wp(40)) * 169) / 336,
    backgroundColor: "#110029",
    borderRadius: wp(22),
    borderWidth: wp(2),
    borderColor: "rgba(255, 255, 255, 0.15)",
    overflow: "hidden",
    alignItems: "center",
  },
  premiumMask1: {
    position: "absolute",
    left: -wp(162),
    right: -wp(140),
    top: -wp(156),
    bottom: -wp(144),
  },
  premiumMask2: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: wp(200),
  },
  premiumLogo: {
    width: wp(151),
    height: wp(50),
    marginTop: wp(27.4),
  },
  premiumLogoCenter: {
    width: wp(151),
    height: wp(50),
    marginTop: wp(45),
  },
  premiumText: {
    color: "white",
    fontSize: wp(14),
    fontWeight: "bold",
    textAlign: "center",
    marginTop: wp(15),
  },
  premiumPlusView: {
    position: "absolute",
    // left: wp(23.4),
    bottom: wp(30),
  },
  premiumPlusImage: {},
  buttonContainer: {
    width: screenWidth - wp(100),
    marginTop: -wp(25),
    alignSelf: "center",
  },
});

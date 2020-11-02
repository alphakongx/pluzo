import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  bottomActions: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    // zIndex: 1000,
  },
  bottomContainer: {
    marginBottom: wp(50),
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: wp(25),
  },
  buttonRowMargin: {
    marginBottom: wp(30),
    marginTop: wp(20),
  },
  buttonSmall: {
    width: wp(50),
    height: wp(50),
    marginHorizontal: wp(10),
    resizeMode: "stretch",
  },
  buttonNormal: {
    width: wp(70),
    height: wp(70),
  },
});

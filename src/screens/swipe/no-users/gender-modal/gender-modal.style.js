import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  flexFill: {
    flex: 1,
  },

  container: {
    borderRadius: wp(22),
    paddingBottom: wp(20),
    overflow: "hidden",
  },

  buttonContainer: {
    marginHorizontal: wp(22),
    marginVertical: wp(15),
  },

  spacer: {
    height: wp(15),
  },

  backdrop: {
    flex: 1,
    backgroundColor: "#0B0516",
    opacity: 0.6,
  },
  tutorialTitle: {
    fontSize: wp(22),
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginTop: wp(15),
  },
});

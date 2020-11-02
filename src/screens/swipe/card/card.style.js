import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flex: 1,
    borderRadius: 4,
    justifyContent: "center",
    backgroundColor: COLOR.HEADER_BACKGROUND,
  },
  cardImage: {
    width: "100%",
    flex: 1,
    backgroundColor: COLOR.HEADER_BACKGROUND,
  },
  overlayView: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#0B0516",
    opacity: 0.8,
  },

  topActions: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingBottom: wp(50),
  },
  gradientOpacityBack: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.8,
  },
});

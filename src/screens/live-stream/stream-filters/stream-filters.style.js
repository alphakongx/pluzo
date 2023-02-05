import { StyleSheet, Dimensions } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

const { width } = Dimensions.get("window");

export { wp };
export default StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },

  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: wp(40),
    height: wp(40),
    borderRadius: wp(20),
    backgroundColor: "rgba(11, 5, 22, 0.6)",
    marginLeft: wp(10),
    marginBottom: wp(10),
  },

  filterList: {
    flex: 1,
    height: 80,
  },
  listContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp(10),
  },
  circle: {
    width: wp(48),
    height: wp(48),
    borderRadius: wp(24),
    borderWidth: wp(4),
    borderColor: "white",
    marginRight: wp(10),
    justifyContent: "center",
    alignItems: "center",
  },
  childCircle: {
    width: wp(26),
    height: wp(26),
    borderRadius: wp(13),
  },
  bigCircle: {
    width: wp(70),
    height: wp(70),
    borderRadius: wp(35),
    borderWidth: wp(4),
    borderColor: "white",
    marginRight: wp(10),
    justifyContent: "center",
    alignItems: "center",
  },
  bigChildCircle: {
    width: wp(44),
    height: wp(44),
    borderRadius: wp(22),
  },
});

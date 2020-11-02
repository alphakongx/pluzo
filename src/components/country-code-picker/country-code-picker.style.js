import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  currentItem: {
    flex: 1,
    borderRadius: wp(22),
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },

  contentContainer: {
    zIndex: 9998,
    position: "absolute",
    backgroundColor: "#ABA7D5",
    left: 0,
    right: 0,
    height: wp(200),
    borderRadius: wp(22),
  },

  spacer: {
    height: wp(50),
  },
  bottomFade: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: wp(20),
    borderBottomLeftRadius: wp(22),
    borderBottomRightRadius: wp(22),
  },

  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: wp(10),
  },
  flag: {
    width: wp(24),
    height: wp(14),
    resizeMode: "stretch",
  },
});

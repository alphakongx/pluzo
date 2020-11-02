import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  heartIcon: {
    width: wp(120),
    height: wp(120),
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: -wp(50),
  },
  topActions: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingBottom: wp(50),
  },

  noUsers: {
    fontSize: wp(24),
    fontWeight: "600",
    color: "white",
  },

  matchesContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(11, 5, 22, 0.5)",
  },
});

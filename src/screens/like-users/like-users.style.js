import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -wp(60),
  },
  headerIcon: {
    width: wp(25),
    height: wp(25),
    resizeMode: "stretch",
    marginRight: wp(9),
  },
  headerText: {
    fontSize: wp(14),
    fontWeight: "bold",
    color: "#01FF8D",
  },

  listContainer: {
    marginBottom: wp(50),
    paddingHorizontal: wp(3),
  },
  itemSeparator: {
    height: wp(10),
  },
});

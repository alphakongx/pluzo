import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  flexFill: {
    flex: 1,
  },

  container: {
    borderRadius: wp(20),
    overflow: "hidden",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    color: "white",
    fontSize: wp(16),
    fontWeight: "bold",
    left: -wp(10),
  },

  friendList: {
    minHeight: wp(250),
    marginBottom: wp(25),
  },
  itemContainer: {
    paddingHorizontal: wp(10),
  },
});

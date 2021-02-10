import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  itemDataContainer: {
    margin: wp(10),
  },
  userName: {
    fontSize: wp(12),
    fontWeight: "600",
    color: COLOR.TEXT_PRIMARY,
    paddingRight: wp(15),
  },
  tagContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: wp(5),
  },
  membersContainer: {
    height: wp(18),
    flexDirection: "row",
    paddingHorizontal: wp(6),
    borderRadius: wp(9),
    justifyContent: "center",
    alignItems: "center",
    marginRight: wp(5),
  },
  memberIcon: {
    width: wp(12),
    height: wp(12),
    resizeMode: "contain",
  },
  memberCount: {
    fontSize: wp(12),
    fontWeight: "bold",
    color: COLOR.TEXT_INPUT,
    paddingLeft: wp(2),
  },
  tagImages: {
    flexDirection: "row",
  },
  tagImage: {
    width: wp(13),
    height: wp(13),
    marginRight: wp(5),
  },
  itemColorView: {
    height: wp(18),
    borderRadius: wp(9),
    justifyContent: "center",
  },
  itemText: {
    fontSize: wp(8),
    fontWeight: "900",
    color: COLOR.TEXT_PRIMARY,
    textShadowColor: "rgba(255, 255, 255, 0.1)",
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
    paddingHorizontal: wp(5),
  },
});

import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  usersList: {
    marginTop: 0,
    marginBottom: wp(20),
  },
  usersListContentContainerStyle: {
    paddingHorizontal: wp(10),
  },
  itemSeparator: {
    width: wp(10),
  },
  itemContainer: {
    justifyContent: "center",
  },
  itemTextContainer: {
    width: wp(97),
    height: wp(50),
    marginRight: wp(10),
    borderRadius: wp(12),
    justifyContent: "flex-end",
    borderWidth: wp(2),
    borderColor: COLOR.SEARCH_INPUT_BORDER,
  },
  itemText: {
    fontSize: wp(10),
    fontWeight: "900",
    color: COLOR.TEXT_PRIMARY,
    paddingLeft: wp(7),
    paddingBottom: wp(5),
    textShadowColor: "rgba(255, 255, 255, 0.1)",
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
  },
  itemImageContainer: {
    width: wp(97),
    height: wp(50),
    marginRight: wp(10),
    borderRadius: wp(12),
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  itemImage: {
    width: wp(34),
    height: wp(34),
    resizeMode: "contain",
    position: "absolute",
    right: 0,
    top: 0,
  },
  itemImage1: {
    height: wp(20),
    resizeMode: "contain",
    position: "absolute",
    right: -wp(13),
    top: wp(6),
  },
  itemColorView: {
    width: wp(20),
    height: wp(20),
    borderRadius: wp(10),
  },
  activeItem: {
    backgroundColor: COLOR.SEARCH_INPUT_BORDER,
  },
});

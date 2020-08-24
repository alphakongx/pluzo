import { StyleSheet, Dimensions } from "react-native";
import { COLOR } from "@config";

const screenWidth = Dimensions.get("screen").width;

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  safeAreaContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    marginBottom: 50,
  },
  separator: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    marginBottom: 20,
  },
  swiperWrapper: {
    marginBottom: 15,
  },
  swiperContainer: {
    height: (screenWidth - 20) / 2 + 15,
  },
  swiperPagenation: {
    bottom: 0,
  },
  swiperDot: {
    width: 20,
    height: 2,
    marginHorizontal: 5,
    backgroundColor: "white",
  },
  swiperActiveDot: {
    width: 20,
    height: 2,
    marginHorizontal: 5,
  },

  itemContainer: {
    flexDirection: "column",
    backgroundColor: COLOR.LIVE_ITEM_BACKGROUND,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    overflow: "hidden",
    marginHorizontal: 5,
    marginBottom: 10,
  },
  itemDataContainer: {
    margin: 10,
  },
  userName: {
    fontSize: 12,
    fontWeight: "600",
    color: COLOR.TEXT_PRIMARY,
    paddingRight: 15,
  },
  tagContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  membersContainer: {
    height: 18,
    flexDirection: "row",
    paddingHorizontal: 6,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  memberIcon: {
    width: 12,
    height: 12,
    resizeMode: "contain",
  },
  memberCount: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLOR.TEXT_INPUT,
    paddingLeft: 2,
  },
  tagImages: {
    flexDirection: "row",
  },
  tagImage: {
    width: 13,
    height: 13,
    marginRight: 5,
  },

  masonryContainer: {
    marginHorizontal: 5,
  },

  // Fav
  favContainer: {
    position: "absolute",
    right: 20,
    bottom: 20,
  },
  plusFav: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});

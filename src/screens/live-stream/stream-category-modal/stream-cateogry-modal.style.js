import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";
import { COLOR } from "@config";

export default StyleSheet.create({
  modalContainer: {
    margin: 0,
    justifyContent: "flex-start",
  },
  flexFill: {
    flex: 1,
  },
  container: {
    flexDirection: "column",
  },

  emojiButtonContainer: {
    flexDirection: "row-reverse",
    marginLeft: wp(164),
    marginTop: wp(13),
  },
  emojiButton: {
    width: wp(77),
    height: wp(35),
    borderRadius: wp(20),
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  emptyCategoryText: {
    color: "#E8E6FF",
    fontWeight: "600",
    fontSize: wp(12),
  },
  emojiCategoryContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    fontSize: wp(10),
    fontWeight: "900",
    color: COLOR.TEXT_PRIMARY,
    textShadowColor: "rgba(255, 255, 255, 0.1)",
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
  },

  emojiContainer: {
    marginHorizontal: wp(10),
    marginTop: wp(10),
  },
});

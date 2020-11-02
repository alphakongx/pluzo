import { StyleSheet } from "react-native";
import { FontHelper, widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: wp(10),
  },

  titleContainer: {
    flex: 1,
    height: wp(35),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
    height: wp(35),
    paddingHorizontal: wp(15),
    borderRadius: wp(20),
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
  },
  inputTitle: FontHelper.font({
    paddingVertical: 0,
    color: "white",
    fontWeight: "700",
    fontSize: wp(14),
  }),
  emojiButton: {
    width: wp(40),
    height: wp(40),
    borderRadius: wp(20),
    backgroundColor: "#000000",
    opacity: 0.6,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: wp(10),
  },

  userCountStyle: {
    minWidth: wp(50),
    height: wp(26),
    borderRadius: wp(13),
    paddingHorizontal: wp(10),
    marginRight: wp(10),
  },
  userTextStyle: {
    fontWeight: "bold",
    marginLeft: wp(5),
  },
});

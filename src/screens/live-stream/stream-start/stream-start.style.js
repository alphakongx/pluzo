import { StyleSheet, Dimensions } from "react-native";

export const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },

  emojiContainer: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10,
  },

  liveButtonContainer: {
    marginBottom: 40,
    paddingHorizontal: 37,
  },
});

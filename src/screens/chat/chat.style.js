import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "@helpers";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
  },
  loadingIndicator: {
    alignSelf: "center",
    marginTop: wp(200),
  },
  systemMessage: {
    marginBottom: wp(15),
  },
});

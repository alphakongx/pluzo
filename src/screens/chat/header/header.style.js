import { StyleSheet } from "react-native";
import { COLOR } from "@config";

export default StyleSheet.create({
  headerContainer: {
    backgroundColor: COLOR.HEADER_BACKGROUND,
  },
  header: {
    height: 70,
    flexDirection: "row",
  },
  backButtonContainer: {
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  backButtonTouchable: {
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContentContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  headerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLOR.TEXT_PRIMARY,
  },
  reportButtonContainer: {
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  reportButtonTouchable: {
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
});

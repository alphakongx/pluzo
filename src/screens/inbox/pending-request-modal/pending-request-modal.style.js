import { StyleSheet, Dimensions } from "react-native";
import { COLOR } from "@config";

const screenHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  flexFill: {
    flex: 1,
  },
  container: {
    borderRadius: 22,
  },
  headerContainer: {
    paddingRight: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  contentContainer: {
    paddingBottom: 30,
    paddingHorizontal: 20,
    marginTop: -10,
  },
  titleText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
  },

  loadingContainer: {
    height: (screenHeight * 50) / 100,
    justifyContent: "center",
    alignItems: "center",
  },

  requesterList: {
    marginVertical: 20,
    height: (screenHeight * 50) / 100,
  },
  separator: {
    height: 12,
  },
  requestContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userContainer: {
    flex: 1,
  },
  firstname: {
    fontWeight: "700",
    fontSize: 14,
    color: "white",
  },
  username: {
    fontWeight: "700",
    fontSize: 10,
    color: COLOR.TEXT_SECONDARY_4,
  },
  crossButton: {
    width: 30,
    height: 30,
    backgroundColor: COLOR.TEXT_SECONDARY_4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginRight: 10,
  },
  crossIcon: {
    width: 14,
    height: 14,
    tintColor: "#0B0516",
  },
  checkButton: {
    width: 30,
    height: 30,
    backgroundColor: COLOR.LIVE_USER_BORDER,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  checkIcon: {
    width: 17,
    height: 14,
    tintColor: "#0B0516",
  },
});

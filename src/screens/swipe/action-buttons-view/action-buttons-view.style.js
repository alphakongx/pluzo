import { StyleSheet } from "react-native";

export default StyleSheet.create({
  bottomActions: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  bottomContainer: {
    marginBottom: 50,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  buttonRowMargin: {
    marginBottom: 30,
    marginTop: 20,
  },
  buttonSmall: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
  buttonNormal: {
    width: 70,
    height: 70,
  },
});

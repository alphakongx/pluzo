import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    width: 50,
    height: 50,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
  },
  micContainer: {
    width: 18,
    height: 18,
    backgroundColor: "#0B0516",
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  mic: {
    width: 10,
    height: 10,
    resizeMode: "contain",
  },
});

import { StyleSheet, Dimensions } from "react-native";
import { COLOR } from "@config";

const screenWidth = Dimensions.get("window").width;
export const circleWidthA = screenWidth - 40;
export const circleWidthB = screenWidth * 58 / 100;
export const circleWidthC = screenWidth * 32 / 100;

export default StyleSheet.create({
  rootContainer: {
    marginBottom: 50,
  },
  container: {
    width: screenWidth,
    height: screenWidth,
    justifyContent: "center",
    alignItems: "center",
  },

  containerA: {
    width: circleWidthA,
    height: circleWidthA,
    borderRadius: circleWidthA / 2,
    backgroundColor: "rgba(171,167,213,0.4)",
    position: "absolute",
  },
  containerB: {
    width: circleWidthB,
    height: circleWidthB,
    borderRadius: circleWidthB / 2,
    backgroundColor: "rgba(171,167,213,0.4)",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  containerC: {
    width: circleWidthC,
    height: circleWidthC,
    borderRadius: circleWidthC / 2,
    backgroundColor: "rgba(171,167,213,0.4)",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  userImage: {
    width: screenWidth * 21 / 100,
    height: screenWidth * 21 / 100,
    borderRadius: screenWidth / 2,
    position: "absolute",
  },

  circleA: {
    width: circleWidthA + 10,
    height: circleWidthA + 10,
    borderRadius: screenWidth / 2,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  circleItemA: {
    width: (circleWidthA + 30) / Math.sqrt(2),
    height: (circleWidthA + 30) / Math.sqrt(2),
  },
  dotA: {
    width: 15,
    height: 15,
    borderRadius: 8,
  },

  circleB: {
    width: circleWidthB + 12,
    height: circleWidthB + 12,
    borderRadius: screenWidth / 2,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  circleItemB: {
    width: (circleWidthB + 26) / Math.sqrt(2),
    height: (circleWidthB + 26) / Math.sqrt(2),
  },
  dotB: {
    width: 11,
    height: 11,
    borderRadius: 6,
  },

  circleC: {
    width: circleWidthC + 24,
    height: circleWidthC + 24,
    borderRadius: screenWidth / 2,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  circleItemC: {
    width: (circleWidthC + 54) / Math.sqrt(2),
    height: (circleWidthC + 54) / Math.sqrt(2),
  },
  dotC: {
    width: 23,
    height: 23,
    borderRadius: 12,
  },

  descriptionText: {
    marginTop: 30,
    marginBottom: 20,
    paddingHorizontal: 20,
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
    color: COLOR.TEXT_SECONDARY_4,
  },
  buttonContainer: {
    paddingHorizontal: 50,
  },

  flexFill: {
    flex: 1,
  },
  modalContainer: {
    borderRadius: 22,
  }
});

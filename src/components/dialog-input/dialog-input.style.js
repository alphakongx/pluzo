import { StyleSheet, Platform, Dimensions } from "react-native";
import { FontHelper } from "@helpers";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      android: {
        backgroundColor: "rgba(0,0,0,0.62)",
      },
    }),
  },
  modal_container: {
    ...Platform.select({
      ios: {
        backgroundColor: "#E3E6E7",
        borderRadius: 22,
        minWidth: width - 30,
      },
      android: {
        backgroundColor: "#fff",
        elevation: 24,
        minWidth: width - 30,
        borderRadius: 22,
      },
    }),
  },
  modal_body: {
    padding: 0,
  },
  title_modal: {
    fontWeight: "bold",
    fontSize: 22,
    color: "white",
    marginTop: 30,
    textAlign: "center",
  },
  message_modal: {
    fontFamily: "OpenSans",
    fontSize: 16,
    color: "#ABA7D5",
    textAlign: "center",
    marginBottom: 20,
  },
  input_container: FontHelper.font({
    textAlign: "left",
    fontSize: 14,
    fontWeight: "bold",
    color: "rgba(0,0,0,1)",
    height: 35,
    borderRadius: 18,
    backgroundColor: "white",
    marginHorizontal: 28,
    marginBottom: 35,
  }),
  btn_container: {
    flex: 1,
    justifyContent: "center",
    borderTopWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    maxHeight: 100,
  },
  divider_btn: {
    height: 1,
    backgroundColor: "white",
    opacity: 0.15,
  },
  touch_modal: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btn_modal_left: {
    fontFamily: "OpenSans",
    fontSize: 16,
    color: "white",
    paddingLeft: 8.5,
  },
  btn_modal_right: {
    fontFamily: "OpenSans",
    fontSize: 16,
    color: "#DC2E2E",
    paddingLeft: 8.5,
  },
  noneHeight: {
    height: 0,
  },
});

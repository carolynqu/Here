import { StyleSheet, Dimensions } from "react-native";
import theme from "./theme.style";

const screenWidth = Dimensions.get("window").width;

// topText: {
//     textAlign: "center",
//     fontFamily: "OpenSansSemiBold",
//     fontSize: 20,
//     paddingTop: 14,
//   },

const globalStyles = StyleSheet.create({
  navigationHeader: {
    fontFamily: "LatoSemiBold",
    fontSize: 30,
    color: theme.text,
  },
  pageHeader: {
    fontFamily: "LatoRegular",
    fontSize: 25,
    textAlign: "center",
    color: theme.text,
  },
  icons: {
    color: "#9C9C9C",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: theme.primaryColor,
    width: 300,
    height: 52,
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: "LatoRegular",
    fontSize: 18,
    color: theme.darkText,
  },
  inputBoxHeader: {
    fontFamily: "LatoRegular",
    fontSize: 18,
    color: theme.darkText,
    paddingBottom: 15,
  },
  scrollStyle: {},
});

export { globalStyles };

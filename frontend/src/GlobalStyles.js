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
  pageHeader: {
    fontFamily: "LatoRegular",
    fontSize: 25,
    textAlign: "center",
  },
  icons: {
    color: "#9C9C9C",
  },
  buttonContainer: {
    display: "flex",
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
});

export { globalStyles };

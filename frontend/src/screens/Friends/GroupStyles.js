import { StyleSheet, Dimensions } from "react-native";
import theme from "../../theme.style";

const screenWidth = Dimensions.get("window").width;

// topText: {
//     textAlign: "center",
//     fontFamily: "OpenSansSemiBold",
//     fontSize: 20,
//     paddingTop: 14,
//   },

const groupStyles = StyleSheet.create({
  addNewText: {
    fontFamily: "LatoRegular",
    fontSize: 20,
    color: theme.lightText,
  },
  groupBox: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: 20,
    alignItems: "center",
    borderColor: theme.backgroundColor,
    borderWidth: 0.5,
    borderLeftColor: theme.primaryColor,
    borderLeftWidth: 3,
    borderRightWidth: 0,
    height: 75,
    marginVertical: 10,
    // borderRadius: 10,
  },
  groupName: {
    fontFamily: "LatoSemiBold",
    fontSize: 20,
    color: theme.darkText,
  },
  iconLocation: {
    marginLeft: 50,
  },
});

export { groupStyles };

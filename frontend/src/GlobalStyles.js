import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

// topText: {
//     textAlign: "center",
//     fontFamily: "OpenSansSemiBold",
//     fontSize: 20,
//     paddingTop: 14,
//   },

const styles = StyleSheet.create({
  pageHeader: {
    fontFamily: "LatoRegular",
    fontSize: 25,
    textAlign: "center",
  },
  icons: {
    color: "#9C9C9C",
  },

  
});

export { styles };

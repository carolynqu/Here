import { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { Feather } from "@expo/vector-icons";
import theme from "../theme.style";
import { globalStyles } from "../GlobalStyles";

const PresentationContainer = ({
  navigation,
  title,
  children,
  xSize = 36,
  xPlace = "left",
}) => {
  const handlePress = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={xPlace == "left" ? styles.xLeft : styles.xRight}
          onPress={handlePress}
        >
          <Feather name="x" size={31} color="black" />
        </TouchableOpacity>
        <Text style={globalStyles.pageHeader}>{title}</Text>
      </View>
      <View style={styles.center}>{children}</View>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  container: {
    backgroundColor: theme.lightestColor,
    height: "100%",
  },
  header: {
    height: 80,
    backgroundColor: "white",
    borderBottomColor: "rgba(0,0,0,0.2)",
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  xLeft: {
    position: "absolute",
    left: 20,
    top: 24,
  },
  xRight: {
    position: "absolute",
    right: 20,
    top: 20,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
export default PresentationContainer;

import { StyleSheet, Image, Text, View, Button, Pressable } from "react-native";
import * as React from "react";

// import { useTheme } from "@react-navigation/native";
import theme from "../../theme.style";
import { globalStyles } from "../../GlobalStyles";

const ToAuth = ({ navigation }) => {
  return (
    <View style={{ marginTop: 70 }}>
      <View style={styles.pictureContainer}>
        <Image
          style={{ resizeMode: "contain", width: 180, height: 180 }}
          source={require("../../../assets/LandingIcon.png")}
        />
      </View>
      <View alignItems="center">
        <Text style={styles.titleText}>Here</Text>
        <Text style={styles.subText}>
          tell your friends where you’re studying
        </Text>
      </View>
      <View alignItems="center">
        <Pressable
          style={[globalStyles.buttonContainer, { marginTop: 34 }]}
          onPress={() => navigation.navigate("Log In")}
        >
          <Text style={[globalStyles.buttonText, { color: "white" }]}>
            Log In
          </Text>
        </Pressable>

        <Pressable
          style={[
            globalStyles.buttonContainer,
            {
              backgroundColor: "white",
              borderColor: theme.primaryColor,
              borderWidth: 1,
              marginTop: 10,
            },
          ]}
          onPress={() => navigation.navigate("Sign Up")}
        >
          <Text style={[globalStyles.buttonText]}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pictureContainer: {
    marginTop: "20%",
    alignItems: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontFamily: "LatoSemiBold",
    fontSize: 70,
    color: theme.blackColor,
    textAlign: "center",
    paddingTop: 18,
  },
  subText: {
    fontFamily: "LatoRegular",
    fontSize: 20,
    color: theme.darkText,
    textAlign: "center",
    paddingTop: 54,
    width: 240,
  },
});
export default ToAuth;

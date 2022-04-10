import * as React from "react";
import Navigation from "./src/Navigation";
import { AuthContext, AuthContextProvider } from "./src/AuthContext";
import { useFonts } from "expo-font";
import { DefaultTheme } from "@react-navigation/native";

function App() {
  const [loaded] = useFonts({
    LatoLight: require("./assets/fonts/Lato-Light.ttf"),
    LatoRegular: require("./assets/fonts/Lato-Regular.ttf"),
    LatoSemiBold: require("./assets/fonts/Lato-Bold.ttf"),
    LatoBlack: require("./assets/fonts/Lato-Black.ttf"),
  });

  if (!loaded) {
    return null;
  }

  //   const MyTheme = {
  //     colors: {
  //       primary: "rgb(255, 45, 85)",
  //       background: "rgb(242, 242, 242)",
  //       card: "rgb(255, 255, 255)",
  //       text: "rgb(28, 28, 30)",
  //       border: "rgb(199, 199, 204)",
  //       notification: "rgb(255, 69, 58)",
  //     },
  //   };

  return (
    <AuthContextProvider>
      <Navigation />
    </AuthContextProvider>
  );
}

export default App;

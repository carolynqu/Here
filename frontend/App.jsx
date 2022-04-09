import * as React from 'react';
import Navigation from './src/Navigation';
import { AuthContext, AuthContextProvider } from './src/AuthContext';
import { useFonts } from 'expo-font';

// const customFonts = {
//   LatoLight: require("./assets/fonts/Lato-Light.ttf"),
//   LatoRegular: require("./assets/fonts/Lato-Regular.ttf"),
//   LatoSemiBold: require("./assets/fonts/Lato-Bold.ttf"),
//   LatoBlack: require("./assets/fonts/Lato-Black.ttf"),
// };

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

	return (
		<AuthContextProvider>
			<Navigation/>
		</AuthContextProvider>
	);
}

export default App;

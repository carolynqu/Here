import * as React from 'react';
import Navigation from './src/Navigation';
import { AuthContext, AuthContextProvider } from './src/AuthContext';


function App() {
	return (
		<AuthContextProvider>
			<Navigation/>
		</AuthContextProvider>
	);
}

export default App;

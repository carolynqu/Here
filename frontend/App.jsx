import * as React from 'react';
import Home from './screens/Home/Home';
import Add from './screens/Add/Add';
import Friends from './screens/Friends/Friends';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {
  	return (
    	<NavigationContainer>
      		<Stack.Navigator>
        		<Stack.Screen 
          			name="Home" 
          			component={Home} 
          		/>
        		<Stack.Screen 
        			name="Add" 
        			component={Add} 
        		/>
        		<Stack.Screen 
        			name="Friends" 
        			component={Friends} 
        		/>
      		</Stack.Navigator>
    	</NavigationContainer>
  	);
}

export default App;

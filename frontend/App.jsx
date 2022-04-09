import * as React from 'react';
import Home from './screens/Home/Home';
import Add from './screens/Add/Add';
import Friends from './screens/Friends/Friends';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function App() {
  	return (
    	<NavigationContainer>
      		<Tab.Navigator
      			screenOptions={{
      			}}
      		>
        		<Tab.Screen 
          			name="Home" 
          			component={Home} 
          		/>
        		<Tab.Screen 
        			name="Add" 
        			component={Add} 
        		/>
        		<Tab.Screen 
        			name="Friends" 
        			component={Friends} 
        		/>
      		</Tab.Navigator>
    	</NavigationContainer>
  	);
}

export default App;

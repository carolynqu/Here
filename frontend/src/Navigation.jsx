import { useContext } from 'react';
import Home from './screens/Home/Home';
import Add from './screens/Add/Add';
import Friends from './screens/Friends/Friends';
import { View, Text, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { getHeaderTitle } from '@react-navigation/elements';
import 'react-native-gesture-handler';
import Header from './Header/Header';
import ProfileButton from './ProfileButton';
import ToAuth from './screens/ToAuth/ToAuth';
import LogIn from './screens/LogIn/LogIn';
import SignUp from './screens/SignUp/SignUp';
import LoginHeader from './LoginHeader/LoginHeader';
import { AuthContext, AuthContextProvider } from './AuthContext';


function Navigation() {
	const Tab = createBottomTabNavigator();
	const Stack = createStackNavigator();
	const profile = <ProfileButton/>
	const getHeader = () => {
  		return <Header profile={profile}/>
	}
	const getLoginHeader = ({ navigation, options, route }) => {
		const title = getHeaderTitle(options, route.name);
  		return <LoginHeader 
  			navigation={navigation}
  			title={title}
  		/>
	};
	const { authState } = useContext(AuthContext);
	return (
		<>
			{authState.userToken ? (
    			<NavigationContainer>
      				<Tab.Navigator
      					screenOptions={{
      						header: getHeader,
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
    		) : (
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen
							name="To Auth"
							component={ToAuth}
							options={{
								header: () => {
									return <View
										style={{
											height: 110,
										}}>
									</View>
								},
							}}
						/>
						<Stack.Screen
							name="Log In"
							component={LogIn}
							options={{
								header: getLoginHeader,
							}}
						/>
						<Stack.Screen
							name="Sign Up"
							component={SignUp}
							options={{
								header: getLoginHeader,
							}}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			)}
		</>
	)
}

export default Navigation;

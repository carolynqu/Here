import { StyleSheet, Text, View } from 'react-native';
import Groups from './Groups';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewGroupMenu from './NewGroupMenu';

const Stack = createNativeStackNavigator();
const MainFriends = () => {
	return (
		<View>
  			<Text>
  	  			Your Groups
  			</Text>
  	  		<Groups/>
		</View>
	);
}
const Friends = () => {
  	return (
  	  	<Stack.Navigator>
  	  		<Stack.Screen name="MainFriends" component={MainFriends}/>
  	  		<Stack.Screen name="NewGroupMenu" component={NewGroupMenu}/>
  	  	</Stack.Navigator>
  	);
}

const styles = StyleSheet.create({
});
export default Friends;

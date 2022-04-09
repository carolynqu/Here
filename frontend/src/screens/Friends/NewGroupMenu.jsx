import { useContext } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';

const NewGroupMenu = ({ group }) => {
  	return (
  	  	<View>
  	  		<Text>New group menu!</Text>
  	  		<Button title="Exit"/>
  	  	</View>
  	);
}
const styles = StyleSheet.create({
	groupName: {
		fontSize: 40,
	}
});
export default NewGroupMenu;

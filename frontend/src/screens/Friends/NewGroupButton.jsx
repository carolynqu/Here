import { useContext } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';

const NewGroupButton = ({ group }) => {
	const newGroup = () => {
		Alert.alert("Test");
	}
  	return (
  	  	<View>
  	  		<TouchableOpacity onPress={newGroup}>
  	  			<Text style={styles.groupName}>
  	  				+ New Group
  	  			</Text>
  	  		</TouchableOpacity>
  	  	</View>
  	);
}
const styles = StyleSheet.create({
	groupName: {
		fontSize: 40,
	}
});
export default NewGroupButton;

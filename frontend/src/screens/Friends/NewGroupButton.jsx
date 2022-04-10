import { useContext } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';

const NewGroupButton = ({ navigation }) => {
	const newGroup = () => {
		navigation.navigate("NewGroupMenu");
	}
  	return (
  	  	<View>
  	  		<TouchableOpacity onPress={newGroup}>
  	  			<Text style={styles.newGroupText}>
  	  				+ New Group
  	  			</Text>
  	  		</TouchableOpacity>
  	  	</View>
  	);
}
const styles = StyleSheet.create({
	newGroupText: {
		fontSize: 40,
	}
});
export default NewGroupButton;

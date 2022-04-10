import { useContext } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';

const AddFriendsButton = ({ navigation }) => {
	const addFriends = () => {
		navigation.navigate("AddFriendsMenu");
	}
  	return (
  	  	<View>
  	  		<TouchableOpacity onPress={addFriends}>
  	  			<Text style={styles.friend}>
  	  				+ Add Friends
  	  			</Text>
  	  		</TouchableOpacity>
  	  	</View>
  	);
}
const styles = StyleSheet.create({
});
export default AddFriendsButton;

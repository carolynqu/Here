import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';

const Friend = ({ friend, selected, updateSelected }) => {
	const [isSelected, setSelected] = useState(selected);
	const toggleSelected = () => {
		updateSelected(friend.id, !isSelected);
		setSelected(!isSelected);
	}
  	return (
  	  	<View>
  	  		<TouchableOpacity onPress={toggleSelected}>
  	  			<Text>
  	  				{friend.firstName} {friend.lastName} {isSelected ? 'x' : 'o'}
  	  			</Text>
  	  		</TouchableOpacity>
  	  	</View>
  	);
}

const styles = StyleSheet.create({
});
export default Friend;

import { useContext } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';

const ModifyGroupButton = ({ navigation, group }) => {
	const modifyGroup = () => {
		navigation.navigate("ModifyGroupMenu", {
			group: group
		});
	}
  	return (
  	  	<View>
  	  		<TouchableOpacity onPress={modifyGroup}>
  	  			<Text style={styles.friend}>
  	  				+ Modfy Group
  	  			</Text>
  	  		</TouchableOpacity>
  	  	</View>
  	);
}
const styles = StyleSheet.create({
});
export default ModifyGroupButton;

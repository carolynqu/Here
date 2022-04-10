import { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PresentationContainer from './PresentationContainer';

const NewGroupMenu = ({ navigation }) => {
  	return (
  		<PresentationContainer title="Make New Group" navigation={navigation}>
  			<TouchableOpacity style={styles.addPhoto}>
  				<Text style={styles.addPhotoText}>
  					Add Photo
  				</Text>
  			</TouchableOpacity>
  		</PresentationContainer>
  	);
}
const styles = StyleSheet.create({
	addPhoto: {
		borderRadius: 90,
		backgroundColor: "purple",
		height: 60,
		width: 60,
		overflow: "hidden",
		alignItems: "center",
		justifyContent: "center",
	},
	addPhotoText: {
		color: "white",
		textAlign: "center",
	},
});
export default NewGroupMenu;

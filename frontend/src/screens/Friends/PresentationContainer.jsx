import { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { Feather } from '@expo/vector-icons';

const PresentationContainer = ({ navigation, title, children }) => {
	const handlePress = () => {
		navigation.goBack();
	}
  	return (
  	  	<View style={styles.container}>
  	  		<View style={styles.header}>
  	  			<TouchableOpacity style={styles.x} onPress={handlePress}>
					<Feather name="x" size={36} color="black" />
  	  			</TouchableOpacity>
  	  			<Text style={styles.title}>
  	  				{title}
  	  			</Text>
  	  		</View>
  	  		<View style={styles.center}>
  	  			{children}
  	  		</View>
  	  	</View>
  	);
}
const styles = StyleSheet.create({
	title: {
		fontSize: 20,
	},
	container: {
		backgroundColor: "rgba(0,0,0,0.1)",
	},
	header: {
		height: 80,
		backgroundColor: "white",
		borderBottomColor: "rgba(0,0,0,0.2)",
		borderBottomWidth: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	x: {
		position: "absolute",
		left: 20,
		top: 20,
	},
	center: {
		alignItems: "center",
		justifyContent: "center",
	},
});
export default PresentationContainer;

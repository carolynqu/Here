import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const LoginHeader = ({ navigation, title }) => {
  	return (
  		<View style={styles.bigContainer}>
  			<View style={styles.bottom}>
  				<TouchableOpacity
  					activeOpacity={0.5}
  					style={styles.text}
  					onPress={navigation.goBack}
  				>
  					<Text style={styles.text}>
						{title}
  					</Text>
  				</TouchableOpacity>
  			</View>
  			<View style={styles.profileButton}>
  			</View>
  		</View>
  	);
}

const styles = StyleSheet.create({
	bigContainer: {
		height: 110,
		position: "relative",
	},
  	bottom: {
  		position: "absolute",
  		bottom: 0,
  	},
  	profileButton: {
  		position: "absolute",
  		right: 0,
  		bottom: 0,
  	},
  	text: {
		fontSize: 40,
  	}
});
export default LoginHeader;

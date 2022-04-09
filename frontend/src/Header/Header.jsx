import { StyleSheet, Text, View } from 'react-native';

const Header = ({profile}) => {
  	return (
  		<View style={styles.bigContainer}>
  			<View style={styles.bottom}>
  				<Text style={styles.text}>StudyWithMe</Text>
  			</View>
  			<View style={styles.profileButton}>
  			{profile}
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
export default Header;

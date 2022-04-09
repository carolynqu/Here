import { StyleSheet, Image, Text, View, Button } from 'react-native';
import * as React from 'react';

const ToAuth = ({ navigation }) => {
  	return (
  	  	<View style={styles.container}>
  	  		<Image
  	  			source={require('../../../assets/ToAuthSplash.png')}
  	  		/>
  	  		<Text
  	  			style={styles.titleText}
  	  		>
  	  			Study With Me
  	  		</Text>
  	  		<Button
  	  			title="Log In"
  	  			onPress={() => navigation.navigate('LogIn')}
  	  		/>
  	  		<Button
  	  			title="Sign Up"
  	  			onPress={() => navigation.navigate('SignUp')}
  	  		/>
  	  	</View>
  	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	titleText: {
		fontSize: 50,
	},
});
export default ToAuth;

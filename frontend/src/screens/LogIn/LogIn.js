import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { AuthContext } from '../../AuthContext';

const LogIn = () => {
	const { signIn } = React.useContext(AuthContext);
  	return (
  	  	<View>
  	  		<Text>
  	  			I am log in
  	  		</Text>
  	  		<Button
  	  			title="Log In"
  	  			onPress={() => signIn({})}
  	  		/>
  	  	</View>
  	);
}

const styles = StyleSheet.create({
});
export default LogIn;

import { useContext } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { AuthContext } from '../../AuthContext';
import { useForm } from 'react-hook-form';
import { Input, PasswordInput, Error } from '../Fields';

const LogIn = ({ navigation }) => {
	const { signIn } = useContext(AuthContext);
	const { control, handleSubmit, formState: { errors }, formState } = useForm();
	const onSubmit = (values) => {
		signIn();
	}
  	return (
  	  	<View>
  	  		<Text>
  	  			School Email:
  	  		</Text>
  	  		<Input
  	  			name="email"
  	  			control={control}
  	  			required
  	  			pattern={/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/}
  	  		/>
  	  		{errors.email && errors.email.type == "required" && 
  	  		<Error>Required field.</Error>}
  	  		{errors.email && errors.email.type == "pattern" && 
  	  		<Error>Invalid email.</Error>}

  	  		<Text>
  	  			Password:
  	  		</Text>
  	  		<PasswordInput
  	  			name="password"
  	  			control={control}
  	  			required
  	  			pattern={/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/} //https://www.w3schools.com/howto/howto_js_password_validation.asp
  	  		/>
  	  		{errors.password && errors.password.type == "required" && 
  	  		<Error>Required field.</Error>}
  	  		{errors.password && errors.password.type == "pattern" && 
  	  		<Error>Password must contain at least one number, one uppercase and lowercase letter, and at least 8 or more characters.</Error>}
  	  		<Button
  	  			title="Log In"
  	  			onPress={handleSubmit(onSubmit)}
  	  		/>
  	  		<Text>Don't have an account? <Text style={styles.link} onPress={() => navigation.navigate('Sign Up')}>Sign Up.</Text></Text>
  	  	</View>
  	);
}

const styles = StyleSheet.create({
	error: {
		color: 'red',
	},
	input: {
		borderStyle: 'solid',
		backgroundColor: 'pink',
	},
	link: {
		color: 'blue',
	},
});
export default LogIn;

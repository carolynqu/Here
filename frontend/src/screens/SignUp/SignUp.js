import { StyleSheet, Text, View, Button } from 'react-native';
import { useForm } from 'react-hook-form';
import { Input, PasswordInput, Error } from '../Fields';
import { signUp } from '../../api';

const SignUp = ({ navigation }) => {
	const { control, handleSubmit, formState: { errors }, formState } = useForm();
	const onSubmit = (values) => {
		signUp({
			firstName: values.firstName,
			lastName: values.lastName,
			email: values.email,
			password: values.password
		});
	}
  	return (
  	  	<View style={styles.container}>
  	  		<Text>
  	  			First Name:
  	  		</Text>
  	  		<Input
  	  			name="firstName"
  	  			control={control}
  	  			required
  	  			autoCapitalize
  	  		/>
  	  		{errors.firstName && errors.firstName.type == "required" && 
  	  		<Error>Required field.</Error>}

  	  		<Text>
  	  			Last Name:
  	  		</Text>
  	  		<Input
  	  			name="lastName"
  	  			control={control}
  	  			required
  	  			autoCapitalize
  	  		/>
  	  		{errors.lastName && errors.lastName.type == "required" && 
  	  		<Error>Required field.</Error>}

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

  	  		<Text>
  	  			Confirm Password:
  	  		</Text>
  	  		<PasswordInput
  	  			name="confirmPassword"
  	  			control={control}
  	  			required
  	  			validate={value => control._fields.password && value == control._fields.password._f.value}
  	  		/>
  	  		{errors.confirmPassword && errors.confirmPassword.type == "required" && 
  	  		<Error>Required field.</Error>}
  	  		{errors.confirmPassword && errors.confirmPassword.type == "validate" && 
  	  		<Error>Passwords must match.</Error>}

  	  		<Button
  	  			title="Sign Up"
  	  			onPress={handleSubmit(onSubmit)}
  	  		/>
  	  		<Text>Already have an account? <Text style={styles.link} onPress={() => navigation.navigate('Log In')}>Log In.</Text></Text>
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
	container: {
		marginTop: 50,
	},
});
export default SignUp;

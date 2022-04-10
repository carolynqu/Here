import { StyleSheet, Text, TextInput } from "react-native";
import { Controller } from "react-hook-form";
import theme from "../theme.style";
import { globalStyles } from "../GlobalStyles";

export const Input = ({
  name,
  control,
  required = false,
  pattern,
  validate,
}) => {
  return (
    <Controller
      control={control}
      rules={{
        required: required,
        pattern: pattern,
        validate: validate,
      }}
      	render={({ field: { onChange, onBlur, value } }) => (
        	<TextInput
          		style={styles.input}
          		onBlur={onBlur}
          		onChangeText={onChange}
          		value={value}
        	/>
      	)}
      	name={name}
    />
  );
};
export const PasswordInput = ({
  	name,
  	control,
  	required = false,
  	pattern,
  	validate,
}) => {
  	return (
    	<Controller
      		control={control}
      		rules={{
        		required: required,
        		pattern: pattern,
        		validate: validate,
      		}}
      		render={({ field: { onChange, onBlur, value } }) => (
        		<TextInput
          			style={styles.input}
          			onBlur={onBlur}
          			onChangeText={onChange}
          			value={value}
          			secureTextEntry
        		/>
      		)}
      		name={name}
    	/>
  	);
};
export const Error = ({ children, ...rest }) => {
  	return (
    	<Text style={styles.error} {...rest}>
      		{children}
    	</Text>
  	);
};
const styles = StyleSheet.create({
  	error: {
    	fontFamily: "LatoRegular",
    	fontSize: 12,
    	color: "red",
  	},
  	input: {
    	height: 45,
    	borderStyle: "solid",
    	borderRadius: 10,
    	backgroundColor: theme.backgroundColor,
  	},
});

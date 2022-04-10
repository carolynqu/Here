import { useContext, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useForm } from 'react-hook-form';
import { Input, Error } from '../Fields';
import PresentationContainer from '../PresentationContainer';
import { AuthContext } from '../../AuthContext';
import DateTimePicker from '@react-native-community/datetimepicker';

const MAX_EVENT_NAME_LENGTH = 27;
const MAX_LOCATION_NAME_LENGTH = 27;
const Add = ({ navigation }) => {
	let dt = new Date();
	dt.setHours(dt.getHours() + 1);
	const [from, setFrom] = useState(new Date());
	const [until, setUntil] = useState(dt);
	//const { newEvent } = useContext(AuthContext);
	const { control, handleSubmit, formState: { errors }, formState } = useForm();
	const onSubmit = (values) => {
		console.log(values);
		console.log(from);
		console.log(until);
	}
  	return (
  		<PresentationContainer title="Add New Event" navigation={navigation} xPlace="right" xSize={26}>
  			<View style={styles.fieldContainer}>
  				<View style={styles.left}>
  	  				<Text>
  	  					Event Name
  	  				</Text>
  				</View>
  	  			<Input
  	  				name="eventName"
  	  				control={control}
  	  				required
  	  				validate={value => value.length <= MAX_EVENT_NAME_LENGTH}
  	  			/>
  	  			{errors.eventName && errors.eventName.type == "required" && 
  	  			<Error>Input is mandatory.</Error>}
  	  			{errors.eventName && errors.eventName.type == "validate" && 
  	  				<Error>Event name may not exceed {MAX_EVENT_NAME_LENGTH} characters.</Error>}

  				<View style={styles.left}>
  	  				<Text>
  	  					Location
  	  				</Text>
  				</View>
  	  			<Input
  	  				name="locationName"
  	  				control={control}
  	  				required
  	  				validate={value => value.length <= MAX_LOCATION_NAME_LENGTH}
  	  			/>
  	  			{errors.locationName && errors.locationName.type == "required" && 
  	  			<Error>Input is mandatory.</Error>}
  	  			{errors.locationName && errors.locationName.type == "validate" && 
  	  				<Error>Location name may not exceed {MAX_LOCATION_NAME_LENGTH} characters.</Error>}

  				<View style={styles.left}>
  	  				<Text>
  	  					From When
  	  				</Text>
  				</View>
  				<View style={styles.dateTimeContainerContainer}>
  					<View style={styles.dateTimeContainer}>
        				<DateTimePicker
          					testID="fromDateTime"
          					value={from}
          					mode={'datetime'}
          					is24Hour={true}
          					onChange={(event, date) => setFrom(date)}
        				/>
        			</View>
        		</View>
  				<View style={styles.left}>
  	  				<Text>
  	  					Until When
  	  				</Text>
  				</View>
  				<View style={styles.dateTimeContainerContainer}>
  					<View style={styles.dateTimeContainer}>
        				<DateTimePicker
          					testID="toDateTime"
          					value={until}
          					mode={'datetime'}
          					is24Hour={true}
          					onChange={(event, date) => setUntil(date)}
        				/>
  					</View>
  				</View>
  			</View>
  	  		<Button
  	  			title="Next"
  	  			onPress={handleSubmit(onSubmit)}
  	  		/>
  		</PresentationContainer>
  	);
}
const styles = StyleSheet.create({
	left: {
		alignItems: "flex-start",
		justifyContent: "flex-start",
		width: "100%",
	},
	fieldContainer: {
		width: "80%",
	},
	dateTimeContainerContainer: {
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
	},
	dateTimeContainer: {
		width: "80%",
	},
});
export default Add;

import { StyleSheet, Text, View } from 'react-native';

const Member = ({ member }) => {
  	return (
  	  	<View>
  	  		<Text>
  	  			{member.firstName} {member.lastName} x
  	  		</Text>
  	  	</View>
  	);
}

const styles = StyleSheet.create({
});
export default Member;

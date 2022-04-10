import { StyleSheet, Text, View } from 'react-native';

const Friend = ({ friend }) => {
  	return (
  	  	<View>
  	  		<Text>
  	  			{friend.firstName} {friend.lastName} x
  	  		</Text>
  	  	</View>
  	);
}

const styles = StyleSheet.create({
});
export default Friend;

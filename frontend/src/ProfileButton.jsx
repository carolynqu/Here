import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProfileButton = () => {
  	return (
  		<TouchableOpacity
  			activeOpacity={0.5}
  		>
  			<Icon name="rocket" size={36}/>
  		</TouchableOpacity>
  	);
}
const styles = StyleSheet.create({
});
export default ProfileButton;

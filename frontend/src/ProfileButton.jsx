import { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from './AuthContext';

const ProfileButton = () => {
	const { signOut } = useContext(AuthContext);
  	return (
  		<TouchableOpacity
  			activeOpacity={0.5}
  			onPress={signOut} //Temporary sign out button
  		>
  			<Icon name="rocket" size={36}/>
  		</TouchableOpacity>
  	);
}
const styles = StyleSheet.create({
});
export default ProfileButton;

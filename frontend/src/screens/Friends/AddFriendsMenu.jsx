import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PresentationContainer from './PresentationContainer';

const AddFriendsMenu = ({ navigation }) => {
  	return (
  		<PresentationContainer title="Add Friends" navigation={navigation}>
  			<Text>
  				Hello I am content
  			</Text>
  		</PresentationContainer>
  	);
}
const styles = StyleSheet.create({
});
export default AddFriendsMenu;

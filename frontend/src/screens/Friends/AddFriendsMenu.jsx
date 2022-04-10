import { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PresentationContainer from '../PresentationContainer';
import Search from './Search';

const AddFriendsMenu = ({ navigation }) => {
	const [ search, setSearch ] = useState("");
  	return (
  		<PresentationContainer title="Add Friends" navigation={navigation}>
  			<View style={styles.maxWidth}>
  	  			<Search search={search} setSearch={setSearch}/>
  			</View>
  		</PresentationContainer>
  	);
}
const styles = StyleSheet.create({
	maxWidth: {
		width: "100%",
	}
});
export default AddFriendsMenu;

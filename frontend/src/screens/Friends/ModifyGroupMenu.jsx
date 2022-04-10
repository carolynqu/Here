import { useContext, useState } from 'react';
import { StyleSheet, Text, FlatList, View } from 'react-native';
import { AuthContext } from '../../AuthContext';
import PresentationContainer from '../PresentationContainer';
import Search from './Search';
import SelectableFriend from './SelectableFriend';

const ModifyGroupMenu = ({ navigation, route }) => {
	const { group } = route.params;
	const { authState, getFriends } = useContext(AuthContext);
	const [ search, setSearch ] = useState("");
	if(!authState.friends){
		getFriends();
	}
	const friends = [];
	if(authState && authState.friends){
		authState.friends.forEach(friend => {
			if((friend.firstName + ' ' + friend.lastName).includes(search)){
				friends.push(friend);
			}
		});
	}
  	return (
  		<PresentationContainer title={group.name} navigation={navigation}>
  			<View style={styles.maxWidth}>
  	  			<Search search={search} setSearch={setSearch}/>
  	  		<FlatList
  	  			data={friends}
  	  			renderItem={({item}) => (
  	  				<SelectableFriend friend={item}/>
  	  			)
  	  			}
  	  		/>
  			</View>
  		</PresentationContainer>
  	);
}
const styles = StyleSheet.create({
	maxWidth: {
		width: "100%",
	}
});
export default ModifyGroupMenu;

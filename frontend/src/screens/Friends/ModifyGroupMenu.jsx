import { useContext, useState } from 'react';
import { StyleSheet, Text, FlatList, View, Button } from 'react-native';
import { AuthContext } from '../../AuthContext';
import PresentationContainer from '../PresentationContainer';
import Search from './Search';
import SelectableFriend from './SelectableFriend';

const ModifyGroupMenu = ({ navigation, route }) => {
	const { group } = route.params;
	const { authState, getFriends, setFriends } = useContext(AuthContext);
	const [ search, setSearch ] = useState("");
	const selected = new Set();
	const updateSelected = (friend, value) => {
		if(value){
			selected.add(friend);
		}
		else{
			selected.delete(friend);
		}
	}
	const handleSubmit = () => {
		const updatedMembers = Array.from(selected);
		setFriends(group.id, updatedMembers);
		existingFriends = group.members;
		navigation.goBack();
	}
	if(!authState.friends){
		getFriends();
	}
	var existingFriends = group.members;
	const existingFriendsSet = new Set();
	existingFriends.forEach(friend => {
		selected.add(friend);
		existingFriendsSet.add(friend.id);
	});
	const friends = [];
	if(authState && authState.friends){
		authState.friends.forEach(friend => {
			if((friend.firstName + ' ' + friend.lastName).includes(search) && !existingFriendsSet.has(friend.id)){
				friends.push(friend);
			}
		});
	}
  	return (
  		<PresentationContainer title={group.name} navigation={navigation}>
  			<View style={styles.maxWidth}>
  	  			<Search search={search} setSearch={setSearch}/>
  	  			<Text style={styles.section}>
  	  				{existingFriends.length} people
  	  			</Text>
  	  			<FlatList
  	  				data={existingFriends}
  	  				renderItem={({item}) => (
  	  					<SelectableFriend friend={item} selected={true} updateSelected={updateSelected}/>
  	  				)
  	  				}
  	  			/>
  	  			<Text style={styles.section}>
  	  				Suggested
  	  			</Text>
  	  			<FlatList
  	  				data={friends}
  	  				renderItem={({item}) => (
  	  					<SelectableFriend friend={item} selected={false} updateSelected={updateSelected}/>
  	  				)
  	  				}
  	  			/>
  	  			<Button
  	  				title="Save"
  	  				onPress={handleSubmit}
  	  			/>
  			</View>
  		</PresentationContainer>
  	);
}
const styles = StyleSheet.create({
	maxWidth: {
		width: "100%",
	},
	section: {
		marginLeft: 8,
		marginBottom: 4,
		marginTop: 4,
	},
});
export default ModifyGroupMenu;

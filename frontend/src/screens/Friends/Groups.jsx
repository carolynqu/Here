import { useContext, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { AuthContext } from '../../AuthContext';
import Group from './Group';
import NewGroupButton from './NewGroupButton';
import Search from './Search';

const Groups = () => {
	const { authState, getGroups } = useContext(AuthContext);
	const [ search, setSearch ] = useState("");
	if(!authState.groups){
		getGroups();
	}
	const groups = [];
	if(authState && authState.groups){
		const added = new Set();
		authState.groups.forEach(group => {
			if(group.name.includes(search)){
				groups.push(group);
				added.add(group.id);
			}
		});
		authState.groups.forEach(group => {
			group.members.forEach(member => {
				if((member.firstName + ' ' + member.lastName).includes(search) && !added.has(group.id)){
					groups.push(group);
				}
			});
		});
	}
  	return (
  	  	<View>
  	  		<Search search={search} setSearch={setSearch}/>
  	  		<NewGroupButton/>
  	  		<FlatList
  	  			data={groups}
  	  			renderItem={({item}) => (
  	  				<Group group={item}/>
  	  			)
  	  			}
  	  		/>
  	  	</View>
  	);
}

const styles = StyleSheet.create({
});
export default Groups;

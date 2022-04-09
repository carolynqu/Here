import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';
import Member from './Member';
import Icon from 'react-native-vector-icons/FontAwesome';

const Group = ({ group }) => {
	const [ isCollapsed, updateCollapsed ] = useState(true);
	const toggleCollapse = () => {
		updateCollapsed(!isCollapsed);
	}
  	return (
  	  	<View>
  	  		<TouchableOpacity onPress={toggleCollapse}>
  	  			<Text style={styles.groupName}>
  	  				{group.name} <Icon name={isCollapsed ? 'angle-down' : 'angle-up'} size={36}/>
  	  			</Text>
  	  		</TouchableOpacity>
  	  		<Collapsible collapsed={isCollapsed}>
  	  		<FlatList
  	  			data={group.members}
  	  			renderItem={({item}) => (
  	  				<Member member={item}/>
  	  			)
  	  			}
  	  		/>
  	  		</Collapsible>
  	  	</View>
  	);
}

const styles = StyleSheet.create({
	groupName: {
		fontSize: 40,
	}
});
export default Group;

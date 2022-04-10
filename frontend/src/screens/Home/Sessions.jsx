import { useContext } from 'react';
import { StyleSheet, Text, FlatList, View } from 'react-native';
import { AuthContext } from '../../AuthContext';
import theme from '../../theme.style';
import Session from './Session';

const Sessions = () => {
	const { authState, getSessions } = useContext(AuthContext);
	if(!authState.sessions){
		getSessions();
	}
	const sessions = authState.sessions;
  	return (
  	  	<View>
  	  		<FlatList
  	  			data={sessions}
  	  			renderItem={({item}) => (
  	  				<Session session={item}/>
  	  			)
  	  			}
  	  		/>
  	  	</View>
  	);
}

const styles = StyleSheet.create({
});
export default Sessions;

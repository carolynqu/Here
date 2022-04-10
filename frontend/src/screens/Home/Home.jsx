import { StyleSheet, Text, View } from 'react-native';
import theme from '../../theme.style';
import Sessions from './Sessions';

const Home = () => {
  	return (
  	  	<View>
  	  		<Text style={styles.title}>
  	  			Current Events
  	  		</Text>
  	  		<Sessions/>
  	  	</View>
  	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 20,
		margin: 10,
		color: theme.darkText,
	},
});
export default Home;

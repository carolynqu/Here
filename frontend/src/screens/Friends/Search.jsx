import { StyleSheet, TextInput } from 'react-native';

const Search = ({ setSearch }) => {
	const handleChange = (event) => {
		setSearch(event);
	}
  	return (
  	  	<TextInput
  	  		style={styles.search}
  	  		onChangeText={handleChange}
  	  		clearTextOnFocus
  	  	/>
  	);
}

const styles = StyleSheet.create({
	search: {
		backgroundColor: 'pink',
	}
});
export default Search;

import { StyleSheet, TextInput } from "react-native";
import { globalStyles } from "../../GlobalStyles";
import theme from "../../theme.style";
import { groupStyles } from "./GroupStyles";

const Search = ({ setSearch }) => {
  const handleChange = (event) => {
    setSearch(event);
  };
  return (
    <TextInput
      style={[globalStyles.input, { marginVertical: 10 }]}
      onChangeText={handleChange}
      clearTextOnFocus
    />
  );
};

export default Search;

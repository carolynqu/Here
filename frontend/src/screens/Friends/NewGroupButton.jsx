import { useContext } from "react";
import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import theme from "../../theme.style";
import { globalStyles } from "../../GlobalStyles";
import { groupStyles } from "./GroupStyles";

const NewGroupButton = ({ navigation }) => {
  const newGroup = () => {
    navigation.navigate("NewGroupMenu");
  };
  return (
    <View>
      <TouchableOpacity
        style={[groupStyles.groupBox, { borderLeftColor: theme.lightText }]}
        onPress={newGroup}
      >
        <Text style={groupStyles.addNewText}>+ New Group</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewGroupButton;

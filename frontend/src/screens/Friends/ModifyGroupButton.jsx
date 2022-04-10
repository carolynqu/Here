import { useContext } from "react";
import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import theme from "../../theme.style";
import { globalStyles } from "../../GlobalStyles";
import { groupStyles } from "./GroupStyles";

const ModifyGroupButton = ({ navigation, group }) => {
  const modifyGroup = () => {
    navigation.navigate("ModifyGroupMenu", {
      group: group,
    });
  };
  return (
    <View>
      <TouchableOpacity onPress={modifyGroup}>
        <Text
          style={[
            groupStyles.addNewText,
            { textAlign: "center", paddingVertical: 5 },
          ]}
        >
          + Add Members
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({});
export default ModifyGroupButton;

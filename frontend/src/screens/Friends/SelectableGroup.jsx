import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";
import { useState } from "react";
import theme from "../../theme.style";
import { globalStyles } from "../../GlobalStyles";
import { groupStyles } from "./GroupStyles";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const SelectableGroup = ({ group, selected, updateSelected }) => {
  const [isSelected, setSelected] = useState(selected);
  const toggleSelected = () => {
    updateSelected(group, !isSelected);
    setSelected(!isSelected);
  };
  return (
    <View>
      <Pressable onPress={toggleSelected}>
        <Text style={styles.groupName}>
          {isSelected ? (
            <Ionicons
              name="ios-checkbox-sharp"
              size={24}
              color={theme.primaryColor}
            />
          ) : (
            <Ionicons
              name="checkbox-outline"
              size={24}
              color={theme.primaryColor}
            />
          )}{" "}
          {"  "}
          {group.name}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  groupName: {
    fontFamily: "LatoRegular",
    fontSize: 20,
    color: theme.darkText,
    marginLeft: 20,
    paddingBottom: 10,
  },
});
export default SelectableGroup;

import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Collapsible from "react-native-collapsible";
import Friend from "./Friend";
import Icon from "react-native-vector-icons/FontAwesome";
import ModifyGroupButton from "./ModifyGroupButton";

import theme from "../../theme.style";
import { globalStyles } from "../../GlobalStyles";
import { groupStyles } from "./GroupStyles";

const Group = ({ navigation, group }) => {
  const [isCollapsed, updateCollapsed] = useState(true);
  const toggleCollapse = () => {
    updateCollapsed(!isCollapsed);
  };
  return (
    <View>
      <TouchableOpacity style={groupStyles.groupBox} onPress={toggleCollapse}>
        <Text style={groupStyles.groupName}>
          {group.name}{" "}
          <Icon name={isCollapsed ? "angle-down" : "angle-up"} size={20} />
        </Text>
      </TouchableOpacity>
      <Collapsible collapsed={isCollapsed}>
        <FlatList
          data={group.members}
          renderItem={({ item }) => <Friend friend={item} />}
        />
        <ModifyGroupButton navigation={navigation} group={group} />
      </Collapsible>
    </View>
  );
};

export default Group;

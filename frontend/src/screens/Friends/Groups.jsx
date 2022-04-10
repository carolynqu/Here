import { useContext, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { AuthContext } from "../../AuthContext";
import themeStyle from "../../theme.style";
import Group from "./Group";
import NewGroupButton from "./NewGroupButton";
import Search from "./Search";

import theme from "../../theme.style";
import { globalStyles } from "../../GlobalStyles";
import { groupStyles } from "./GroupStyles";

const Groups = ({ navigation }) => {
  const { authState, getGroups } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  if (!authState.groups) {
      getGroups({ id: authState.userToken });
  }
  const groups = [];
  if (authState && authState.groups) {
    const added = new Set();
    authState.groups.forEach((group) => {
      if (group.name.includes(search)) {
        groups.push(group);
        added.add(group.id);
      }
    });
    authState.groups.forEach((group) => {
      group.members.forEach((member) => {
        if (
          (member.firstName + " " + member.lastName).includes(search) &&
          !added.has(group.id)
        ) {
          groups.push(group);
        }
      });
    });
  }
  return (
    <View style={{ marginHorizontal: theme.horizMargin }}>
      <Text style={globalStyles.mainPageHeader}> Your Groups</Text>
      <Search search={search} setSearch={setSearch} />
      <NewGroupButton navigation={navigation} />
      <FlatList
        data={groups}
        renderItem={({ item }) => (
          <Group navigation={navigation} group={item} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
export default Groups;

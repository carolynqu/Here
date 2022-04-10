import { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  Button,
  Pressable,
} from "react-native";
import { AuthContext } from "../../AuthContext";
import PresentationContainer from "../PresentationContainer";
import Search from "./Search";
import SelectableFriend from "./SelectableFriend";
import theme from "../../theme.style";
import { globalStyles } from "../../GlobalStyles";
import { groupStyles } from "./GroupStyles";

const ModifyGroupMenu = ({ navigation, route }) => {
  const { group } = route.params;
  const { authState, getFriends, setFriends } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const selected = new Set();
  const updateSelected = (friend, value) => {
    if (value) {
      selected.add(friend);
    } else {
      selected.delete(friend);
    }
  };
  const handleSubmit = () => {
    const updatedMembers = Array.from(selected);
    setFriends(group.id, updatedMembers);
    existingFriends = group.members;
    navigation.goBack();
  };
  if (!authState.friends) {
    getFriends();
  }
  var existingFriends = group.members;
  const existingFriendsSet = new Set();
  existingFriends.forEach((friend) => {
    selected.add(friend);
    existingFriendsSet.add(friend.id);
  });
  const friends = [];
  if (authState && authState.friends) {
    authState.friends.forEach((friend) => {
      if (
        (friend.firstName + " " + friend.lastName).includes(search) &&
        !existingFriendsSet.has(friend.id)
      ) {
        friends.push(friend);
      }
    });
  }
  return (
    <PresentationContainer title={group.name} navigation={navigation}>
      <View
        style={{
          width: "100%",
          paddingHorizontal: theme.horizMargin,
          paddingTop: 30,
        }}
      >
        <Text style={globalStyles.inputBoxHeader}> Search For Members </Text>
        <Search search={search} setSearch={setSearch} />
        <Text style={[styles.section, { marginTop: 30 }]}>
          {existingFriends.length} people
        </Text>
        <FlatList
          data={existingFriends}
          renderItem={({ item }) => (
            <SelectableFriend
              friend={item}
              selected={true}
              updateSelected={updateSelected}
            />
          )}
        />
        <Text style={styles.section}>Suggested</Text>
        <FlatList
          data={friends}
          renderItem={({ item }) => (
            <SelectableFriend
              friend={item}
              selected={false}
              updateSelected={updateSelected}
            />
          )}
        />
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <Pressable
            style={[globalStyles.buttonContainer]}
            onPress={handleSubmit}
          >
            <Text style={[globalStyles.buttonText, { color: "white" }]}>
              Save
            </Text>
          </Pressable>
        </View>
      </View>
    </PresentationContainer>
  );
};
const styles = StyleSheet.create({
  maxWidth: {
    width: "100%",
  },
  section: {
    fontFamily: "LatoSemiBold",
    fontSize: 15,
    color: theme.text,
    marginVertical: 16,
  },
});
export default ModifyGroupMenu;

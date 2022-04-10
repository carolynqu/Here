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
import Search from "../Friends/Search";
import SelectableFriend from "../Friends/SelectableFriend";
import SelectableGroup from "../Friends/SelectableGroup";
import theme from "../../theme.style";
import { globalStyles } from "../../GlobalStyles";
import { groupStyles } from "../Friends/GroupStyles";

const Invite = ({ navigation, route }) => {
  	const { values } = route.params;
  	const { authState, getFriends, getGroups } = useContext(AuthContext);
  	const [search, setSearch] = useState("");
  	const selectedFriends = new Set();
  	const updateSelectedFriends = (friend, value) => {
    	if (value) {
      		selectedFriends.add(friend);
    	} else {
      		selectedFriends.delete(friend);
    	}
  	};
  	const selectedGroups = new Set();
  	const updateSelectedGroups = (group, value) => {
    	if (value) {
      		selectedGroups.add(group);
    	} else {
      		selectedGroups.delete(group);
    	}
  	};
  	const handleSubmit = () => {
    	navigation.goBack();
  	};

  	if (!authState.friends) {
    	getFriends();
  	}
  	const friends = [];
  	if (authState && authState.friends) {
    	authState.friends.forEach((friend) => {
      		if((friend.firstName + " " + friend.lastName).includes(search)){
        		friends.push(friend);
      		}
    	});
  	}

  	if (!authState.groups) {
    	getGroups({ id: authState.userToken });
  	}
  	const groups = [];
  	if (authState && authState.groups) {
    	authState.groups.forEach((group) => {
      		if(group.name.includes(search)){
        		groups.push(group);
      		}
    	});
  	}
  	return (
    	<PresentationContainer title="Invite People" navigation={navigation}>
      		<View
        		style={{
          			width: "100%",
          			paddingHorizontal: theme.horizMargin,
          			paddingTop: 30,
        		}}
      		>
        		<Text style={globalStyles.inputBoxHeader}> Search For Groups/Friends </Text>
        		<Search search={search} setSearch={setSearch} />
        		<Text style={styles.section}>Groups</Text>
        		<FlatList
          			data={groups}
          			renderItem={({ item }) => (
            			<SelectableGroup
              				group={item}
              				selected={false}
              				updateSelected={updateSelectedGroups}
            			/>
          			)}
        		/>
        		<Text style={styles.section}>Friends</Text>
        		<FlatList
          			data={friends}
          			renderItem={({ item }) => (
            			<SelectableFriend
              				friend={item}
              				selected={false}
              				updateSelected={updateSelectedFriends}
            			/>
          			)}
        		/>
        		<View style={{ alignItems: "center", marginTop: 50 }}>
          			<Pressable
            			style={[globalStyles.buttonContainer]}
            			onPress={handleSubmit}
          			>
            			<Text style={[globalStyles.buttonText, { color: "white" }]}>
              				Create Event
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
export default Invite;

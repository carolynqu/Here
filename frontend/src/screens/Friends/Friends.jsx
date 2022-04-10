import { StyleSheet, Text, View } from "react-native";
import Groups from "./Groups";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewGroupMenu from "./NewGroupMenu";
import ModifyGroupMenu from "./ModifyGroupMenu";

const Stack = createNativeStackNavigator();
const getLoginHeader = ({ navigation, options, route }) => {
  const title = getHeaderTitle(options, route.name);
  return <LoginHeader navigation={navigation} title={title} />;
};
const MainFriends = ({ navigation }) => {
  return (
    <View>
      <Text>{/* Your Groups */}</Text>
      <Groups navigation={navigation} />
    </View>
  );
};
const Friends = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => {
          return <></>;
        },
        presentation: true,
      }}
    >
      <Stack.Screen name="MainFriends" component={MainFriends} />
      <Stack.Screen name="NewGroupMenu" component={NewGroupMenu} />
      <Stack.Screen name="ModifyGroupMenu" component={ModifyGroupMenu} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
export default Friends;

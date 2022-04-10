import { useContext } from "react";
import Home from "./screens/Home/Home";
import Add from "./screens/Add/Add";
import Friends from "./screens/Friends/Friends";
import { View, Text, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getHeaderTitle } from "@react-navigation/elements";
import "react-native-gesture-handler";
import Header from "./Header/Header";
import ProfileButton from "./ProfileButton";
import ToAuth from "./screens/ToAuth/ToAuth";
import LogIn from "./screens/LogIn/LogIn";
import SignUp from "./screens/SignUp/SignUp";
import LoginHeader from "./LoginHeader/LoginHeader";
import { AuthContext, AuthContextProvider } from "./AuthContext";
import { Foundation } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import style from "./GlobalStyles";

const TabNav = ({ navigation }) => { //Used for logged in screen
  	const Tab = createBottomTabNavigator();
  	const profile = <ProfileButton />;
  	const getHeader = () => {
    	return <Header profile={profile} />;
  	};
	return (
        <Tab.Navigator
            screenOptions={{
              	header: getHeader,
              	tabBarStyle: { paddingTop: 10, height: 85 },
            }}
            initialRouteName="Home"
        >
            <Tab.Screen
              	name="Home"
              	component={Home}
              	options={{
                	tabBarIcon: ({ size, color }) => (
                  		<Foundation name="home" size={30} color={color} />
                	),
                	tabBarActiveTintColor: "#A0AFFE",
                	tabBarLabelStyle: {
                  		fontFamily: "LatoRegular",
                	},
              	}}
            />
            <Tab.Screen
              	name="Add"
              	component={Add}
              	options={{
                	tabBarIcon: ({ size, color }) => (
                  		<MaterialIcons name="add-box" size={30} color={color} />
                	),
                	tabBarActiveTintColor: "#A0AFFE",
                	tabBarLabelStyle: {
                  		fontFamily: "LatoRegular",
                	},
              	}}
              	listeners={{
              		tabPress: e => {
              			e.preventDefault();
              			navigation.navigate("Add");
              		}
              	}}
            />
            <Tab.Screen
              	name="Friends"
              	component={Friends}
              	options={{
                	tabBarIcon: ({ size, color }) => (
                  		<FontAwesome5 name="user-friends" size={30} color={color} />
                	),
                	tabBarActiveTintColor: "#A0AFFE",
                	tabBarLabelStyle: {
                  		fontFamily: "LatoRegular",
                	},
              	}}
            />
        </Tab.Navigator>
    );
}
const StackNav = () => { //Used for login
  	const Stack = createNativeStackNavigator();
	return (
        <Stack.Navigator
            screenOptions={{
              	header: () => {
                	return <></>;
              	},
            }}
        >
            <Stack.Screen name="To Auth" component={ToAuth} />
            <Stack.Screen name="Log In" component={LogIn} />
            <Stack.Screen name="Sign Up" component={SignUp} />
        </Stack.Navigator>
    )
}
const Navigation = () => {
  	const Stack = createNativeStackNavigator();
  	const { authState } = useContext(AuthContext);
  	return (
    	<>
      		{authState.userToken ? (
        		<NavigationContainer>
        			<Stack.Navigator
        				screenOptions={{
        					header: () => {
        						return <></>;
        					},
        					presentation: true,
        				}}
        			>
        				<Stack.Screen name="Tabs" component={TabNav}/>
        				<Stack.Screen name="Add" component={Add}/>
        			</Stack.Navigator>
        		</NavigationContainer>
      		) : (
        		<NavigationContainer>
        			<StackNav/>
        		</NavigationContainer>
      		)}
    	</>
  	);
}

export default Navigation;

import { createContext, useReducer, useEffect, useMemo } from "react";
import { Alert } from "react-native";
export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  	const [authState, dispatch] = useReducer(
    	(prevState, action) => {
      		switch (action.type) {
        		case "SIGN_IN":
          			return {
            			...prevState,
            			isSignout: false,
            			userToken: action.token,
          			};
        		case "SIGN_OUT":
          			return {
            			...prevState,
            			isSignout: true,
            			userToken: null,
          			};
        		case "GET_GROUPS":
          			return {
            			...prevState,
            			groups: action.groups,
            			isLoading: false,
          			};
          		case "GET_FRIENDS":
          			return {
          				...prevState,
          				friends: action.friends,
          				isLoading: false,
          			};
          		case "SET_FRIENDS":
          			const newGroups = [];
          			prevState.groups.forEach(group => {
          				if(group.id == action.groupId){
          					group.members = action.newMembers;
          				}
          				newGroups.push(group);
          			});
          			return {
          				...prevState,
          				groups: newGroups,
          			};
        		case "NEW_GROUP":
          			return {
            			...prevState,
            			groups: [...prevState.groups, action.group],
          			};
        		case "GET_SESSIONS":
          			return {
          				...prevState,
          				sessions: action.sessions,
          				isLoading: false,
          			};
      		}
    	},
    	{
      		isLoading: true,
      		isSignout: false,
      		userToken: true,
      		//userToken: null,
      		groups: undefined,
      		friends: undefined,
      		sessions: undefined,
    	}
  	);
  	const authContext = useMemo(
    	() => ({
      		signIn: async (data) => {
        		// In a production app, we need to send some data (usually username, password) to server and get a token
        		// We will also need to handle errors if sign in failed
        		// After getting token, we need to persist the token using `SecureStore`
        		// In the example, we'll use a dummy token

        		dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      		},
      		signOut: () => dispatch({ type: "SIGN_OUT" }),
      		signUp: async (data) => {
        		// In a production app, we need to send user data to server and get a token
        		// We will also need to handle errors if sign up failed
        		// After getting token, we need to persist the token using `SecureStore`
        		// In the example, we'll use a dummy token

        		dispatch({ type: "SIGN_OUT" });
      		},
      		getGroups: async (data) => {
        		await new Promise((resolve) => setTimeout(resolve, 1000));
        		dispatch({ type: "GET_GROUPS", groups: sampleGroups });
      		},
      		getFriends: async (data) => {
        		await new Promise((resolve) => setTimeout(resolve, 1000));
        		dispatch({ type: "GET_FRIENDS", friends: sampleFriends });
      		},
      		setFriends: (groupId, newMembers) => {
      			dispatch({ type: "SET_FRIENDS", groupId: groupId, newMembers: newMembers });
      		},
      		newGroup: (group) => {
        		dispatch({ type: "NEW_GROUP", group: group });
      		},
      		getSessions: async (data) => {
        		await new Promise((resolve) => setTimeout(resolve, 1000));
        		dispatch({ type: "GET_SESSIONS", sessions: sampleSessions });
      		},
    	}),
    	[]
  	);
  	return (
    	<AuthContext.Provider value={{ authState, ...authContext }}>
      		{children}
    	</AuthContext.Provider>
  	);
};
const sampleGroups = [
  	{
    	id: 0,
    	picture: "url",
    	name: "Group 0",
    	members: [
      		{
        		id: 0,
        		picture: "url",
        		firstName: "Nathan",
        		lastName: "Ahn",
      		},
      		{
        		id: 1,
        		picture: "url",
        		firstName: "Carolyn",
        		lastName: "Qu",
      		},
      		{
        		id: 2,
        		picture: "url",
        		firstName: "Alex",
        		lastName: "Shi",
      		},
      		{
        		id: 3,
        		picture: "url",
        		firstName: "Joseph",
        		lastName: "Zhang",
      		},
    	],
  	},
  	{
    	id: 1,
    	picture: "url",
    	name: "Group 1",
    	members: [
      		{
        		id: 0,
        		picture: "url",
        		firstName: "Nathan",
        		lastName: "Ahn",
      		},
      		{
        		id: 1,
        		picture: "url",
        		firstName: "Carolyn",
        		lastName: "Qu",
      		},
    	],
  	},
];
const sampleFriends = [
    {
        id: 0,
        picture: "url",
        firstName: "Nathan",
        lastName: "Ahn",
    },
    {
        id: 1,
        picture: "url",
        firstName: "Carolyn",
        lastName: "Qu",
    },
    {
        id: 2,
        picture: "url",
        firstName: "Alex",
        lastName: "Shi",
    },
    {
        id: 3,
        picture: "url",
        firstName: "Joseph",
        lastName: "Zhang",
    },
];
Date.prototype.addHours= function(h){ //https://stackoverflow.com/questions/1050720/adding-hours-to-javascript-date-object
	    this.setHours(this.getHours()+h);
	    return this;
}
const sampleSessions = [
	{
		id: 0,
		name: "Event!",
		isStudy: true,
		isPrivate: true,
		location: "place",
		start: (new Date().addHours(0)).toJSON(),
		end: (new Date().addHours(1)).toJSON(),
		organizer: {
			id: 2,
			picture: "url",
			firstName: "Carolyn",
			lastName: "Qu",
		},
	},
	{
		id: 1,
		name: "Event2!",
		isStudy: true,
		isPrivate: true,
		location: "place",
		start: (new Date().addHours(1)).toJSON(),
		end: (new Date().addHours(2)).toJSON(),
		organizer: {
			id: 2,
			picture: "url",
			firstName: "Carolyn",
			lastName: "Qu",
		},
	},
];

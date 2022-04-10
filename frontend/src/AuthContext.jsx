import { createContext, useReducer, useEffect, useMemo } from "react";
import { Alert } from "react-native";
import { addUser, userSignIn, createGroup } from './api';
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
            			friends: action.friends,
            			groups: action.groups,
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
      		userToken: null,
      		groups: undefined,
      		friends: undefined,
      		sessions: undefined,
    	}
  	);
  	const authContext = useMemo(
    	() => ({
      		signIn: async (values) => {
				const resData = await userSignIn(values);
				if(!resData) return false;
        		dispatch({ type: "SIGN_IN", token: resData.id, groups: resData.groups, friends: resData.following });
      		},
      		signOut: () => dispatch({ type: "SIGN_OUT" }),
      		signUp: async (values) => {
      			const resData = await addUser(values);
      			if(!resData) return false;
        		dispatch({ type: "SIGN_IN", token: resData.email });
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
      		newGroup: async ({id, groupName, picture}) => {
      			const resData = await createGroup({ 
      				id: id,
      				groupName: groupName, 
      				picture: picture
      			});
      			console.log(resData);
        		//dispatch({ type: "NEW_GROUP", group: group });
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

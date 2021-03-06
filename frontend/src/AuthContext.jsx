import { createContext, useReducer, useEffect, useMemo } from "react";
import { Alert } from "react-native";
import { addUser, userSignIn, createGroup, fetchGroups, updateMembers, getFriends } from './api';

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
						//friends: action.friends,
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
						if (group.id == action.groupId) {
							group.members = action.members;
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
				const res = await userSignIn(values);
				if (!res) return false;
				dispatch({ type: "SIGN_IN", token: res.id, friends: res.following });
			},
			signOut: () => dispatch({ type: "SIGN_OUT" }),
			signUp: async (values) => {
				const res = await addUser(values);
				if (!res) return false;
				dispatch({ type: "SIGN_IN", token: res.id });
			},
			getGroups: async ({ id }) => {
				const res = await fetchGroups({
					id: id
				});
				dispatch({ type: "GET_GROUPS", groups: res });
			},
			getFriends: async ({ id }) => {
				const res = await getFriends({
					id: id
				});
				dispatch({ type: "GET_FRIENDS", friends: res });
			},
			setMembers: async ({ id, groupId, members }) => {
				dispatch({ type: "SET_FRIENDS", groupId: groupId, members: members });
				const memberIds = [];
				members.forEach(m => {
					memberIds.push(m.id);
				});
				const res = await updateMembers({
					id: id,
					groupId: groupId,
					memberIds: memberIds,
				});
				if (!res) {
					console.log("Error updating members");
				}
			},
			newGroup: async ({ id, groupName, picture }) => {
				const res = await createGroup({
					id: id,
					groupName: groupName,
					picture: picture
				});
				dispatch({ type: "NEW_GROUP", group: res }); //Warning: gives members as IDs
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
Date.prototype.addHours = function (h) { //https://stackoverflow.com/questions/1050720/adding-hours-to-javascript-date-object
	this.setHours(this.getHours() + h);
	return this;
}
const sampleSessions = [
	{
		id: 0,
		name: "CPSC 323 Study Session",
		isStudy: true,
		isPrivate: true,
		location: "Bass Library",
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
		name: "Orgo Review",
		isStudy: true,
		isPrivate: true,
		location: "Sterling",
		start: (new Date().addHours(1)).toJSON(),
		end: (new Date().addHours(2)).toJSON(),
		organizer: {
			id: 2,
			picture: "url",
			firstName: "Alex",
			lastName: "Shi",
		},
	},
	{
		id: 2,
		name: "Lunch",
		isStudy: true,
		isPrivate: true,
		location: "TD Dining Hall",
		start: (new Date().addHours(0)).toJSON(),
		end: (new Date().addHours(1)).toJSON(),
		organizer: {
			id: 3,
			picture: "url",
			firstName: "Nathan",
			lastName: "Ahn",
		},
	},
	{
		id: 3,
		name: "Open Soccer Game",
		isStudy: true,
		isPrivate: true,
		location: "Cross Campus",
		start: (new Date().addHours(3)).toJSON(),
		end: (new Date().addHours(4)).toJSON(),
		organizer: {
			id: 3,
			picture: "url",
			firstName: "Joseph",
			lastName: "Zhang",
		},
	},
];

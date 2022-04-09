import { createContext, useReducer, useEffect, useMemo } from 'react';
import { Alert } from 'react-native';
export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
	const [authState, dispatch] = useReducer(
    	(prevState, action) => {
      		switch (action.type) {
        		case 'SIGN_IN':
          			return {
            			...prevState,
            			isSignout: false,
            			userToken: action.token,
          			};
        		case 'SIGN_OUT':
          			return {
            			...prevState,
            			isSignout: true,
            			userToken: null,
          			};
          		case 'GET_GROUPS':
          			return {
          				...prevState,
          				groups: action.groups,
          				isLoading: false,
          			};
          		case 'ADD_GROUP':
          			return {
          				...prevState,
          				groups: [...groups, action.group],
          			};
      		}
    	},
    	{
      		isLoading: true,
      		isSignout: false,
      		userToken: true,
      		//userToken: null,
      		groups: undefined,
    	}
	);
	const authContext = useMemo(
    	() => ({
      		signIn: async (data) => {
        		// In a production app, we need to send some data (usually username, password) to server and get a token
        		// We will also need to handle errors if sign in failed
        		// After getting token, we need to persist the token using `SecureStore`
        		// In the example, we'll use a dummy token

        		dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      		},
      		signOut: () => dispatch({ type: 'SIGN_OUT' }),
      		signUp: async (data) => {
        		// In a production app, we need to send user data to server and get a token
        		// We will also need to handle errors if sign up failed
        		// After getting token, we need to persist the token using `SecureStore`
        		// In the example, we'll use a dummy token

        		dispatch({ type: 'SIGN_OUT' });
      		},
      		getGroups: async (data) => {
      			await new Promise(resolve => setTimeout(resolve, 1000));
      			dispatch({ type: 'GET_GROUPS', groups: sampleGroups });
    		},
    		setGroup: (group) => {
    			dispatch({ type: 'SET_GROUP', group: group });
    		}
		}),
    	[]
	);
  	return (
    	<AuthContext.Provider value={{ authState, ...authContext }}>
      		{children}
    	</AuthContext.Provider>
  	);
}
const sampleGroups =  [
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
      						]
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
      						]
      					},
      				]

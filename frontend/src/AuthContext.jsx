import { createContext, useReducer, useEffect, useMemo } from 'react';
import { Alert } from 'react-native';
export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
	const [authState, dispatch] = useReducer(
    	(prevState, action) => {
      		switch (action.type) {
        		case 'RESTORE_TOKEN':
          			return {
            			...prevState,
            			userToken: action.token,
            			isLoading: false,
          			};
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
      		}
    	},
    	{
      		isLoading: true,
      		isSignout: false,
      		userToken: true,
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

				Alert.alert("Test");
        		dispatch({ type: 'SIGN_OUT' });
      		},
    	}),
    	[]
	);
  	return (
    	<AuthContext.Provider value={{ authState, ...authContext }}>
      		{children}
    	</AuthContext.Provider>
  	);
}

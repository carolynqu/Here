import axios from 'axios';
//const baseUrl = 'http://localhost:3000';
const baseUrl = 'http://172.29.23.221:3000';

const post = async (endpoint, data) => {
	const json = JSON.stringify(data);
	console.log(json);
	try {
		const res = await axios.post(`${baseUrl}${endpoint}`, json, {
			headers: {
				'Content-Type': 'application/json',
			}
		});
		if(typeof res.data === 'string'){
			return undefined;
		}
		return res.data;
	}
	catch (err) {
		console.log(err);
	}
}

export const getFriends = async ({ id }) => {
	return await post('/friends/', {
		id: id
	})
}

// Passing configuration object to axios
export const addUser = async ({ firstName, lastName, email, password }) => {
  	return await post('/sign-up', {
  		firstName: firstName,
  		lastName: lastName,
  		email: email,
  		password: password,
  	});
}
export const userSignIn = async ({ email, password }) => {
  	return await post('/sign-in', {
  		email: email,
  		password: password,
  	});
}
export const createGroup = async ({ id, groupName, picture }) => {
  	return await post('/groups/create-group', {
  		id: id,
  		groupName: groupName,
  		picture: picture,
  	});
}
export const updateMembers = async ({ id, groupId, memberIds }) => {
	return await post('/groups/add', {
		id: id,
		group: groupId,
		members: memberIds,
	});
}
export const fetchGroups = async ({ id }) => {
	return await post('/groups/', {
		id: id,
	});
}

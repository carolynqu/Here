import axios from 'axios';
//const baseUrl = 'http://localhost:3000';
const baseUrl = 'http://172.29.20.120:3000';

// Passing configuration object to axios
export const addUser = async ({ firstName, lastName, email, password }) => {
	const json = JSON.stringify({
  		firstName: firstName,
  		lastName: lastName,
  		email: email,
  		password: password,
  	});
	axios.post(`${baseUrl}/sign-up`, json, {
		headers: {
			'Content-Type': 'application/json',
		},
	}).then(res => {
		if(res.data.includes("email-already-in-use")){
			return undefined;
		}
		return res.data;
	}).catch(err => {
		console.log(err);
	});
}
export const userSignIn = async ({ email, password }) => {
	const json = JSON.stringify({
  		email: email,
  		password: password,
  	});
	axios.post(`${baseUrl}/sign-in`, json, {
		headers: {
			'Content-Type': 'application/json',
		},
	}).then(res => {
		console.log(res.data);
		if(res.data.includes("email-already-in-use")){
			return undefined;
		}
		return res.data;
	}).catch(err => {
		console.log(err);
	});
}

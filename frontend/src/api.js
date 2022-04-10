import axios from 'axios';
const baseUrl = 'http://localhost:3000';

// Passing configuration object to axios
export const signUp = async ({ firstName, lastName, email, password }) => {
	axios.post(`${baseUrl}/sign-up`, {
  		firstName: firstName,
  		lastName: lastName,
  		email: email,
  		password: password,
	}, {
		headers: {
			'content-type': 'text/json'
		}
	}).then(res => {
		console.log(res);
	}).catch(err => {
		console.log(err);
	});
}

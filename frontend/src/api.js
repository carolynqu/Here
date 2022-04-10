import axios from 'axios';
//const baseUrl = 'http://localhost:3000';
const baseUrl = 'http://172.29.20.120:3000';

// Passing configuration object to axios
export const signUp = async ({ firstName, lastName, email, password }) => {
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
	})
		.then(res => {
			console.log(res);
		}).catch(err => {
			console.log(err);
		});
}

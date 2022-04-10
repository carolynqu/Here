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
  	try{
		const res = await axios.post(`${baseUrl}/sign-up`, json, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
		if(typeof res.data === 'string'){
			return undefined;
		}
		return res.data;
	}
	catch (err) {
		console.log(err);
	};
}
export const userSignIn = async ({ email, password }) => {
	const json = JSON.stringify({
  		email: email,
  		password: password,
  	});
  	try {
		const res = await axios.post(`${baseUrl}/sign-in`, json, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if(typeof res.data === 'string'){
			return undefined;
		}
		console.log(res.data);
		return res.data;
	}
	catch (err){
		console.log(err);
	}
}

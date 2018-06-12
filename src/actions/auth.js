import { GET, POST, PUT } from './api-wrapper';
import { API_URL, LOGIN_URL } from './types';
import axios from 'axios';

export const login = (data, dispatch) => {
	console.log(data)
	return axios.post(LOGIN_URL, data)
		.then(response => {
			return response.data;
		})
		.catch(err => {
			return err.response.data;
		})
	
}

// export const signup = (data, dispatch) => {
// 	dispatch({ type: 'CHANGE_PROMOTION', payload: {data: data} });	
// }
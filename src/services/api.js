import axios from "axios";

export function setTokenHeader(token){
	if(token){
		 axios.defaults.headers.common["Authorization"] = "Bearer " + token;
	} else {
		delete axios.defaults.headers.common["Authorization"];
	}
}

export function apiCall(method, path, data) {
	console.log('The Method: ' + method)
	console.log('The Path: ' + path)
	console.log('The Data: ' + data)
	
	//Our own code to test config TO BE DELETED OR UPDATED
	let config = {
		headers: {
			"Content-Type": "application/json"
		},
		withCredentials: true
	}
	return new Promise((resolve, reject) => {
		return axios[method](path, data, config).then(res =>{
			return resolve(res.data);
		})
		.catch(err => {
			return reject(err.response.data.error);
		})
	})
}
import fetch from "isomorphic-fetch";

const fetchAsyncData = (onSuccess, onError) => {
	return fetch("https://api.github.com/users/ayoubdev/repos").then((response) => {
		return response.json();
	}).then((data) => {
		onSuccess(data);
	}).catch((error) => {
		onError(error);
	});
};

export {
	fetchAsyncData
};
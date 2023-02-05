const onResponse = (res) => {
	return res.ok ? res.json() : Promise.reject(`Ошибка : ${res.status}`);
}
const config = {
	baseUrl: 'https://api.react-learning.ru',
	headers: {
		'content-type': 'application/json',
		'authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M1OTAzZjU5Yjk4YjAzOGY3N2E2NWIiLCJncm91cCI6Imdyb3VwLTkiLCJpYXQiOjE2NzQ4NTExMjAsImV4cCI6MTcwNjM4NzEyMH0.XDxJnjUUmXR1iLuhwiHFYMye6tAFnml5-Y9jif-RnJk"
	},
};
class Api {
	constructor({ baseUrl, headers }) {
		this._headers = headers;
		this._baseUrl = baseUrl;
	}
	authorization(data) {
		return fetch(`${this._baseUrl}/signin`, {
			headers: this._headers,
			method: 'POST',
			body: JSON.stringify(data),
		}).then(onResponse)
			.then(res => {
				localStorage.setItem('token', res.token);
			});
	}
	getAllPosts() {
		return fetch(`${this._baseUrl}/v2/group-9/posts`, {
			headers: this._headers,
			method: 'GET',
		}).then(onResponse)
	}
	getPostById(id) {
		return fetch(`${this._baseUrl}/v2/group-9/posts/${id}`, {
			headers: this._headers,
			method: 'GET',
		}).then(onResponse)
	}
	getCommentsByPostId(postId) {
		return fetch(`${this._baseUrl}/v2/group-9/posts/comments/${postId}`, {
			headers: this._headers,
			method: 'GET',
		}).then(onResponse)
	}
	addComment(postId, text) {
		return fetch(`${this._baseUrl}/v2/group-9/posts/comments/${postId}`, {
			headers: this._headers,
			method: 'POST',
			body: JSON.stringify({ text })
		}).then(onResponse)
	}
	getAuthUser() {
		return fetch(`${this._baseUrl}/v2/group-9/users/me`, {
			headers: this._headers,
			method: 'GET',
		}).then(onResponse)
	}
	editPost(postId, data) {
		return fetch(`${this._baseUrl}/v2/group-9/posts/${postId}`, {
			headers: this._headers,
			method: 'PATCH',
			body: JSON.stringify({ data })
		}).then(onResponse)
	}
	deletePost(postId) {
		return fetch(`${this._baseUrl}/v2/group-9/posts/${postId}`, {
			headers: this._headers,
			method: 'DELETE',
		}).then(onResponse)
	}
	addLike(postId) {
		return fetch(`${this._baseUrl}/v2/group-9/posts/likes/${postId}`, {
			headers: this._headers,
			method: 'PUT',
		}).then(onResponse)
	}
	removeLike(postId) {
		return fetch(`${this._baseUrl}/v2/group-9/posts/likes/${postId}`, {
			headers: this._headers,
			method: 'DELETE',
		}).then(onResponse)
	}
}
export const api = new Api(config)
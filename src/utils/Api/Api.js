const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка : ${res.status}`);
};

class Api {
  constructor({ url, headers }) {
    this._headers = headers;
    this._url = url;
  }

  getAllPosts() {
    return fetch(`${this._url}/v2/group-9/posts`, this._headers()).then(
      onResponse
    );
  }
  getPostById(id) {
    return fetch(`${this._url}/v2/group-9/posts/${id}`, this._headers()).then(
      onResponse
    );
  }
  getCommentsByPostId(postId) {
    return fetch(
      `${this._url}/v2/group-9/posts/comments/${postId}`,
      this._headers()
    ).then(onResponse);
  }
  addComment(postId, text) {
    return fetch(`${this._url}/v2/group-9/posts/comments/${postId}`, {
      ...this._headers(),
      method: "POST",
      body: JSON.stringify({ text }),
    }).then(onResponse);
  }
  deleteComment(postId, commentId) {
    return fetch(
      `${this._url}/v2/group-9/posts/comments/${postId}/${commentId}`,
      {
        ...this._headers(),
        method: "DELETE",
      }
    ).then(onResponse);
  }
  getAuthUser() {
    return fetch(`${this._url}/v2/group-9/users/me`, this._headers()).then(
      onResponse
    );
  }
  editUserInfo(data) {
    return fetch(`${this._url}/v2/group-9/users/me`, {
      ...this._headers(),
      method: "PATCH",
      body: JSON.stringify(data),
    }).then(onResponse);
  }
  editUserAvatar(data) {
    return fetch(`${this._url}/v2/group-9/users/me/avatar`, {
      ...this._headers(),
      method: "PATCH",
      body: JSON.stringify(data),
    }).then(onResponse);
  }
  createPost(data) {
    return fetch(`${this._url}/v2/group-9/posts`, {
      ...this._headers(),
      method: "POST",
      body: JSON.stringify(data),
    }).then(onResponse);
  }
  editPost(postId, data) {
    return fetch(`${this._url}/v2/group-9/posts/${postId}`, {
      ...this._headers(),
      method: "PATCH",
      body: JSON.stringify(data),
    }).then(onResponse);
  }
  deletePost(postId) {
    return fetch(`${this._url}/v2/group-9/posts/${postId}`, {
      ...this._headers(),
      method: "DELETE",
    }).then(onResponse);
  }
  changeLike(postId, isLiked) {
    return fetch(`${this._url}/v2/group-9/posts/likes/${postId}`, {
      ...this._headers(),
      method: isLiked ? "DELETE" : "PUT",
    }).then(onResponse);
  }
}
const headers = () => {
  return {
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  };
};
const config = {
  url: "https://api.react-learning.ru",
  headers: headers,
};

export const api = new Api(config);

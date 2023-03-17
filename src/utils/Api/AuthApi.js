const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res);
};
const config = {
  url: "https://api.react-learning.ru",
  headers: {
    "content-type": "application/json",
  },
};

class Api {
  constructor({ url, headers }) {
    this._headers = headers;
    this._url = url;
  }
  authorization(data) {
    return fetch(`${this._url}/signin`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(data),
    }).then(onResponse);
  }
  registration(data) {
    return fetch(`${this._url}/signup`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(data),
    }).then(onResponse);
  }
  reset(data) {
    return fetch(`${this._url}/forgot-password`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(data),
    }).then(onResponse);
  }
  setNewPswd(data, token) {
    return fetch(`${this._url}/password-reset/${token}`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify(data),
    }).then(onResponse);
  }
}

export const authApi = new Api(config);

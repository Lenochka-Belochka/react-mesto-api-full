class Api {
  constructor({ baseUrl }) {
    this._url = baseUrl;
  }

  get _headers() {
    return {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
    }
}

_checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getUserProfile() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  saveNewProfile(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      }),
    })
      .then(this._checkResponse);
  }

  addCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this._checkResponse)
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  updateAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar
      }),
    })
      .then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: "https://mesto.back.project.nomoredomains.sbs",
});

export default api;

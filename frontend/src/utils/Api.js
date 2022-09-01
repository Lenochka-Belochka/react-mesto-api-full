class Api {
  constructor({
    baseUrl,
  }) {
    this._baseUrl = baseUrl;
  }


  _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
    },
      })
      .then(this._handleResponse);
  }

  getUserProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
    },
      })
      .then(this._handleResponse);
  }

  getAllData() {
    return Promise.all([this.getInitialCards(), this.getUserProfile()])
  }

  addCard({
    name,
    link
  }) {
    return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          name,
          link
        })
      })
      .then(this._handleResponse);
  }

  saveNewProfile({
    name,
    about
  }) {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          name,
          about
        })
      })
      .then(this._handleResponse);
  }

  updateAvatar({
    avatar
  }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          avatar
        })
      })
      .then(this._handleResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json'
      },
      })
      .then(this._handleResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    const method = isLiked ? "DELETE" : "PUT";
    const request = this._baseUrl + `/cards/${cardId}/likes`;
    return fetch(request, {
      method: method,
      headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json'
      },
    }).then((res) => this._checkResponse(res));
  }
}

export const api = new Api({
  baseUrl: "https://mesto.back.project.nomoredomains.sbs",
});

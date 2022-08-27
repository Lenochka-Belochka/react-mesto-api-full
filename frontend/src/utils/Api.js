const hasError = res => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
};

class Api {
  constructor({baseUrl, headers}) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _getHeaders() {
    const jwt = localStorage.getItem('jwt');
    return {
      'Authorization': `Bearer ${jwt}`,
      ...this._headers,
    };
  }

  getInitialCards() { 
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._getHeaders()
    })
      .then(hasError);
  }

  getUserProfile() { 
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._getHeaders()
    })
      .then(hasError);
  }

  renderUserAndCards() { // если оба промиса зарезолвены - верни массив этих промисов
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
  }

  saveNewProfile(profileData) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: profileData.name,
        about: profileData.about
      })
    })
    .then(hasError)
  }

  addCard(cardData) { 
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    })
      .then(hasError);
  }

  updateAvatar(newAvatar) { 
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: newAvatar.link,
      })
    })
    .then(hasError)
  }

  likeCard(cardId) { 
    return fetch(`${this._url}/cards/${cardId._id}/likes`, {
      method: 'PUT',
      headers: this._getHeaders()
    })
      .then(hasError);
  }

  deleteLike(cardId) { 
    return fetch(`${this._url}/cards/${cardId._id}/likes`, {
      method: 'DELETE',
      headers: this._getHeaders()
    })
      .then(hasError);
  }
  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId._id}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  deleteCard(cardId) { 
    return fetch(`${this._url}/cards/${cardId._id}`, {
      method: 'DELETE',
      headers: this._getHeaders()
    })
      .then(hasError);
  }
}

const api = new Api({ 
  baseUrl: 'https://mesto.back.project.nomoredomains.sbs',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;

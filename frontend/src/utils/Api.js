export class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl
  }

  //Ответ от сервера
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка выполнении запроса: ${res.status}`);
  }

  
  // Публичный метод для загрузки пользовательского профиля

  getUserProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
    },
      })
      .then((res) => this._checkResponse(res))
  }

  //Публичный метод для загрузки карточек

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
    },
      })
      .then((res) => this._checkResponse(res))
  }

  // Метод для удаления карточки
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
    },
    })
      .then((res) => this._checkResponse(res))
  }


  // Метод для добавления карточки
  addCard(cardData) { 
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    })
      .then((res) => this._checkResponse(res))
  }

  //Метод для сохранения данных профиля 

  saveNewProfile(profileData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({
        name: profileData.name,
        about: profileData.about,
      }),
    })
      .then((res) => this._checkResponse(res))
  }

  // Метод для обновления автара 
  updateAvatar(newAvatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({
        avatar: newAvatar.link,
      }),
    })
      .then((res) => this._checkResponse(res))
  }

  // разделила лайк и лислайк

  
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

// Здесь создаем экземпляр класса Api с нужными параметрами, включая токен, и экспортируем этот экземпляр вместо самого класса
export const api = new Api({
  baseUrl: `https://mesto.back.project.nomoredomains.sbs`,
 }
 );




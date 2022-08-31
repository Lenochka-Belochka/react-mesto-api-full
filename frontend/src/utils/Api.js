export class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
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
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
    }).then((res) => this._checkResponse(res));
  }
  //Публичный метод для загрузки карточек

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
    }).then((res) => this._checkResponse(res));
  }
  
  // Метод для удаления карточки
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
    }).then((res) => this._checkResponse(res));
  }


  // Метод для добавления карточки
  addCard({name, link}) { 
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
      credentials: "include",
      body: JSON.stringify({
        name: name,
        link: link
      }),
    }).then((res) => this._checkResponse(res));
  }

  //Метод для сохранения данных профиля 

  saveNewProfile({name, about}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => this._checkResponse(res));
  }

  // Метод для обновления автара 
  updateAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._checkResponse(res));
  }

changeLikeCardStatus(id, isLiked) {
  return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: !isLiked ? 'PUT' : 'DELETE',
      headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
  }).then((res) => this._checkResponse(res));
}
}

  /*
  // Метод для лайка карточки
  likeCard(cardId) {
    const request = this._baseUrl + `/cards/${cardId}/likes`;
    return fetch(request, {
      method: "PUT",
      headers: this._headers,
    })
      .then((res) => this._checkResponse(res))
  }

  // Метод для удаления лайка 
  deleteLike(cardId) {
    const request = this._baseUrl + `/cards/${cardId}/likes`;
    return fetch(request, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => this._checkResponse(res))
  }
  */

  


  export const api = new Api({
  baseUrl: "https://mesto.back.project.nomoredomains.sbs",
});


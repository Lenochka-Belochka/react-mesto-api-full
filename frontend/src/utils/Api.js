export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
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
        "Content-Type": this._headers.contentType,
      },
    }).then((res) => this._checkResponse(res));
  }
  //Публичный метод для загрузки карточек

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        "Content-Type": this._headers.contentType,
      },
    }).then((res) => this._checkResponse(res));
  }
  
  // Метод для удаления карточки
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": this._headers.contentType,
      },
    }).then((res) => this._checkResponse(res));
  }


  // Метод для добавления карточки
  addCard(data) { 
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": this._headers.contentType,
      },
      credentials: "include",
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._checkResponse(res));
  }

  //Метод для сохранения данных профиля 

  saveNewProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": this._headers.contentType,
      },
      credentials: "include",
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._checkResponse(res));
  }

  // Метод для обновления автара 
  updateAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": this._headers.contentType,
      },
      credentials: "include",
      body: JSON.stringify({
        avatar: data.avatar,
      }),
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

  


const api = new Api({
  baseUrl: "https://mesto.back.project.nomoredomains.sbs",
  headers: {
    contentType: "application/json",
  },
});

export default api;


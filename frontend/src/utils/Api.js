import {cohort, token} from './Utils';

export class Api {
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

  //Ответ от сервера
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка выполнении запроса: ${res.status}`);
  }

  
  // Публичный метод для загрузки пользовательского профиля

  getUserProfile() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._getHeaders(),
    })
      .then((res) => this._checkResponse(res))
  }

  //Публичный метод для загрузки карточек

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._getHeaders(),
    })
      .then((res) => this._checkResponse(res))
  }

  // Метод для удаления карточки
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId._id}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    })
      .then((res) => this._checkResponse(res))
  }


  // Метод для добавления карточки
  addCard(cardData) { 
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    })
      .then((res) => this._checkResponse(res))
  }

  //Метод для сохранения данных профиля 

  saveNewProfile(profileData) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: profileData.name,
        about: profileData.about,
      }),
    })
      .then((res) => this._checkResponse(res))
  }

  // Метод для обновления автара 
  updateAvatar(newAvatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: newAvatar.link,
      }),
    })
      .then((res) => this._checkResponse(res))
  }

  // Метод для лайка карточки
  likeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId._id}/likes`, {
      method: "PUT",
      headers: this._getHeaders(),
    })
      .then((res) => this._checkResponse(res))
  }

  // Метод для удаления лайка 
  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId._id}/likes`, {
      method: "DELETE",
      headers: this._getHeaders(),
    })
      .then((res) => this._checkResponse(res))
  }
  changeLikeCardStatus(cardId, isLiked) {
    const method = isLiked ? "DELETE" : "PUT";
    const request = this._baseUrl + `/cards/${cardId}/likes`;
    return fetch(request, {
      method: method,
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }
  // создание пользователя

 register(password, email) {
  return (
    fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ password, email }),
    })
      .then((res) => this._checkResponse(res))
  );
}

// авторизация 

login(password, email) {
    fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ password, email }),
    })
      .then((res) => this._checkResponse(res));
}

// проверка токена

getContent(token) {
  const request = this._baseUrl + "/users/me";
  const newHeaders = this._headers;
  newHeaders["Authorization"] = `Bearer ${token}`;

  return (
    fetch(request, {
      method: "GET",
      headers: _getHeaders(),
    })
      .then((res) => this._checkResponse(res))
      .then((data) => {
        return data;
      })
  );
}
}

export const Auth = new Api({
baseUrl: "https://mesto.back.project.nomoredomains.sbs",
headers: { "Content-Type": "application/json" },
});


// Здесь создаем экземпляр класса Api с нужными параметрами, включая токен, и экспортируем этот экземпляр вместо самого класса
export const api = new Api({
  baseUrl: `https://mesto.back.project.nomoredomains.sbs`,
  headers: { 'Content-Type': 'application/json'  }
});




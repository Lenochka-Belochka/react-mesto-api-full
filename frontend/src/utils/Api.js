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
    const request = this._baseUrl + "/users/me";
    return fetch(request, {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => this._checkResponse(res))
  }

  //Публичный метод для загрузки карточек

  getInitialCards() {
    const request = this._baseUrl + "/cards";
    // возвращаем промис
    return fetch(request, {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => this._checkResponse(res))
  }

  // Метод для удаления карточки
  deleteCard(cardId) {
    const request = this._baseUrl + `/cards/${cardId}`;
    return fetch(request, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => this._checkResponse(res))
  }


  // Метод для добавления карточки
  addCard(cardData) { 
    const request = this._baseUrl + "/cards";
    const newHeaders = this._headers;
    newHeaders["Content-Type"] = "application/json";
    return fetch(request, {
      method: "POST",
      headers: newHeaders,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    })
      .then((res) => this._checkResponse(res))
  }

  //Метод для сохранения данных профиля 

  saveNewProfile(profileData) {
    const request = this._baseUrl + "/users/me";
    const newHeaders = this._headers;
    newHeaders["Content-Type"] = "application/json";
    // отправляем запрос
    return fetch(request, {
      method: "PATCH",
      headers: newHeaders,
      body: JSON.stringify({
        name: profileData.name,
        about: profileData.about,
      }),
    })
      .then((res) => this._checkResponse(res))
  }

  // Метод для обновления автара 
  updateAvatar(newAvatar) {
    const request = this._baseUrl + "/users/me/avatar";
    const newHeaders = this._headers;
    newHeaders["Content-Type"] = "application/json";
    return fetch(request, {
      method: "PATCH",
      headers: newHeaders,
      body: JSON.stringify({
        avatar: newAvatar.link,
      }),
    })
      .then((res) => this._checkResponse(res))
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
  const request = this._baseUrl + "/signup";

  return (
    fetch(request, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ password, email }),
    })
      .then((res) => this._checkResponse(res))
  );
}

// авторизация 

login(password, email) {
  const request = this._baseUrl + "/signin";

  return (
    fetch(request, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ password, email }),
    })
      .then((res) => this._checkResponse(res))
  );
}

// проверка токена

getContent(token) {
  const request = this._baseUrl + "/users/me";
  const newHeaders = this._headers;
  newHeaders["Authorization"] = `Bearer ${token}`;

  return (
    fetch(request, {
      method: "GET",
      headers: newHeaders,
    })
      .then((res) => this._checkResponse(res))
      .then((data) => {
        return data;
      })
  );
}
}


// Здесь создаем экземпляр класса Api и экспортируем этот экземпляр вместо самого класса
export const auth = new Api({
baseUrl: "https://mesto.back.project.nomoredomains.sbs",
headers: { "Content-Type": "application/json" },
});


// Здесь создаем экземпляр класса Api с нужными параметрами, включая токен, и экспортируем этот экземпляр вместо самого класса
export const api = new Api({
  baseUrl: `https://mesto.back.project.nomoredomains.sbs`,
  headers: { 
  authorization: `Bearer ${localStorage.getItem('jwt')}`,
 },
});




export const BASE_URL = 'https://mesto.back.project.nomoredomains.sbs';

 // создание пользователя

 const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка выполнении запроса: ${res.status}`);
}

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ password, email }),
    })
      .then(checkResponse)
}

// авторизация 

export const login = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ password, email }),
    })
    .then(checkResponse)
  }

// проверка токена

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(checkResponse)
    .then((data) => {
        return data;
      })
    }
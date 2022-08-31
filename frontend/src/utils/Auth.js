export const BASE_URL = "https://mesto.back.project.nomoredomains.sbs";

const  checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка выполнении запроса: ${res.status}`);
  }

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};


export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};


export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  }).then(checkResponse);
};



  
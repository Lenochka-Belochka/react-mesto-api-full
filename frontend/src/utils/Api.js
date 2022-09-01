class Api {
  constructor({ url, headers }) {
      this._url = url;
      this._headers = headers
  }
  getInitialCards(token) {
      return fetch(`${this._url}cards`, {
              method:"GET",
              headers: {...this._headers, authorization: `Bearer ${token}`},
          })
          .then(res => {
              if (res.ok) {
                  return res.json();
              }
              return Promise.reject(`Ошибка: ${res.status}`);
          })
          .then((result) => {
              console.log(result);
              return result;
          });
  }
  getUserProfile(token) {
      return fetch(`${this._url}users/me`, {
              method:"GET",
              headers: {...this._headers, authorization: `Bearer ${token}`},
          })
          .then(res => {
              if (res.ok) {
                  return res.json();
              }
              return Promise.reject(`Ошибка: ${res.status}`);
          })
          .then((result) => {
              console.log(result);
              return result;
          })
  }
  saveNewProfile(formData, token) {
      return fetch(`${this._url}users/me`, {
              method: 'PATCH',
             headers: {...this._headers, authorization: `Bearer ${token}`},
              body: JSON.stringify({
                  name: formData.name,
                  about: formData.about
              })
          })
          .then(res => {
              if (res.ok) {
                  return res.json();
              }
              return Promise.reject(`Ошибка: ${res.status}`);
          })
  }
  addCard(formData, token) {
      return fetch(`${this._url}cards`, {
          method: 'POST',
          headers: {...this._headers, authorization: `Bearer ${token}`},
          body: JSON.stringify({
              name: formData.name,
              link: formData.link
          })
      })
      .then(res => {
          if (res.ok) {
              return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
      })
}
  deleteCard(id, token) {
      return fetch(`${this._url}cards/${id}`, {
          method: 'DELETE',
          headers: {...this._headers, authorization: `Bearer ${token}`}
      })
          .then(res => {
              if (res.ok) {
                  return res.json();
              }
              return Promise.reject(`Ошибка: ${res.status}`);
          })
  }
  changeLikeCardStatus(CardId, isLiked, token) {
      return fetch(`${this._url}cards/${CardId}/likes`, {
          method: isLiked ? 'PUT' : 'DELETE',
          headers: {...this._headers, authorization: `Bearer ${token}`}
      })
      .then(res => {
          if (res.ok) {
              return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
  updateAvatar(formData,  token) {
      return fetch(`${this._url}users/me/avatar`, {
              method: 'PATCH',
              headers: {...this._headers, authorization: `Bearer ${token}`},
              body: JSON.stringify({
                  avatar: formData.avatar
              })
          })
          .then(res => {
              if (res.ok) {
                  return res.json();
              }
              return Promise.reject(`Ошибка: ${res.status}`);
          })
  }
}
export const api = new Api({
  url: 'https://mesto.back.project.nomoredomains.sbs/',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  }
});


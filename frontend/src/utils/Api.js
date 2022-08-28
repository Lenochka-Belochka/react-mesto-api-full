class Api {
    constructor({ address }) {
      this.address = address
      }
  
      _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(new Error(`Ошибка: ${res.status}`));
      }
  
      getInitialCards() {
          return fetch(`${this.address}/cards`, {
            headers: {
              authorization: this.getToken(),
            },
          })
              .then(this._checkResponse);
      }
  
      getUserProfile() {
          return fetch(`${this.address}/users/me`, {
            headers: {
              authorization: this.getToken(),
            },
          })
              .then(this._checkResponse)
      }
  
      saveNewProfile(data) {
          return fetch(`${this.address}/users/me`, {
              method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              authorization: this.getToken(),
            },
              body: JSON.stringify({
                  name: data.name,
                  about: data.about
              })
          })
              .then(this._checkResponse)
      }
  
      addCard(data) {
          return fetch(`${this.address}/cards`, {
              method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              authorization: this.getToken(),
            },
              body: JSON.stringify({
                  name: data.name,
                  link: data.link
              })
          })
              .then(this._checkResponse)
      }
  
      deleteCard(dataId) {
          return fetch(`${this.address}/cards/${dataId}`, {
              method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              authorization: this.getToken(),
            },
          })
              .then(this._checkResponse)
      }
  
      changeLikeCardStatus(dataId, isLiked) {
          const method = isLiked ? 'DELETE' : 'PUT';
          return fetch(`${this.address}/cards/${dataId}/likes`, {
              method,
            headers: {
              'Content-Type': 'application/json',
              authorization: this.getToken(),
            },
          })
              .then(this._checkResponse)
      }
  
      updateAvatar(data) {
          return fetch(`${this.address}/users/me/avatar`, {
              method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              authorization: this.getToken(),
            },
              body: JSON.stringify({
                  avatar: data.avatar
              })
          })
            .then(this._checkResponse)
      }
  
    getToken() {
      return `Bearer ${localStorage.getItem('token')}`
    }
  }
  
  const api = new Api({
    address: 'https://mesto.back.project.nomoredomains.sbs',
  });
  
  export default api;




class Api {
    constructor({ address }) {
      this.address = address
      }
  
      _checkServerStatus(res) {
        return res.ok ? res.json() : Promise.reject(new Error(`Ошибка: ${res.status}`));
      }
  
      getInitialCards() {
          return fetch(`${this.address}/cards`, {
            headers: {
              authorization: this.getToken(),
            },
          })
              .then(this._checkServerStatus);
      }
  
      getUserInfo() {
          return fetch(`${this.address}/users/me`, {
            headers: {
              authorization: this.getToken(),
            },
          })
              .then(this._checkServerStatus)
      }
  
      setUserInfo(data) {
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
              .then(this._checkServerStatus)
      }
  
      postNewCard({ name, link }) {
          return fetch(`${this.address}/cards`, {
              method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              authorization: this.getToken(),
            },
              body: JSON.stringify({
				name,
				link
              })
          })
              .then(this._checkServerStatus)
      }
  
      deleteCard(id) {
          return fetch(`${this.address}/cards/${id}`, {
              method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              authorization: this.getToken(),
            },
          })
              .then(this._checkServerStatus)
      }
  
      changeLikeCardStatus(id, isLiked) {
          const method = isLiked ? 'DELETE' : 'PUT';
          return fetch(`${this.address}/cards/${id}/likes`, {
              method,
            headers: {
              'Content-Type': 'application/json',
              authorization: this.getToken(),
            },
          })
              .then(this._checkServerStatus)
      }
  
      updateAvatar(link) {
          return fetch(`${this.address}/users/me/avatar`, {
              method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              authorization: this.getToken(),
            },
              body: JSON.stringify({
                  avatar: link
              })
          })
            .then(this._checkServerStatus)
      }
  
    getToken() {
      return `Bearer ${localStorage.getItem('token')}`
    }
  }
  
  export const api = new Api({
    address: 'https://mesto.back.project.nomoredomains.sbs',
  });
  
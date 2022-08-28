class Api {
  constructor({ address }) {
    this.address = address
    }

    _getResponseData(res) {
      return res.ok ? res.json() : Promise.reject(new Error(`Ошибка: ${res.status}`));
    }

    getInitialCards() {
        return fetch(`${this.address}/cards`, {
          headers: {
            authorization: this.getToken(),
          },
        })
            .then(this._getResponseData);
    }

    getAboutUser() {
        return fetch(`${this.address}/users/me`, {
          headers: {
            authorization: this.getToken(),
          },
        })
            .then(this._getResponseData)
    }

    editProfile(data) {
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
            .then(this._getResponseData)
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
            .then(this._getResponseData)
    }

    deleteCard(dataId) {
        return fetch(`${this.address}/cards/${dataId}`, {
            method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            authorization: this.getToken(),
          },
        })
            .then(this._getResponseData)
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
            .then(this._getResponseData)
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
          .then(this._getResponseData)
    }

  getToken() {
    return `Bearer ${localStorage.getItem('token')}`
  }
}

export const api = new Api({
  address: 'https://mesto.back.project.nomoredomains.sbs',
});


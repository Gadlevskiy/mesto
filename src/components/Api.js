export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      new Error(`Произошла ошибка со статусом ${res.status}`)
    );
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  editProfile(user) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: user.name,
        about: user.about,
      }),
    })
      .then(this._checkResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  editAvatar(userUrl) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: userUrl.avatar,
      }),
    })
      .then(this._checkResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  createCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
      .then(this._checkResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  like(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  unlike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch((err) => {
        console.log(err);
      });
  }
}

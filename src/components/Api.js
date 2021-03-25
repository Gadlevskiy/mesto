export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          new Error(`Произошла ошибка со статусом ${res.status}`)
        );
      })
      .catch((err) => Promise.reject(err));
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(
        new Error(`Произошла ошибка со статусом ${res.status}`)
      );
    });
  }

  editProfile(user) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: user.name,
        about: user.about
      })
    },).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(
        new Error(`Произошла ошибка со статусом ${res.status}`)
      );
    });
  }

  createCard() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          new Error(`Произошла ошибка со статусом ${res.status}`)
        );
      })
      .catch((err) => Promise.reject(err));
  }

  deleteCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          new Error(`Произошла ошибка со статусом ${res.status}`)
        );
      })
      .catch((err) => Promise.reject(err));
  }
}

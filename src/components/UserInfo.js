export class UserInfo {
  constructor({ name, about, avatar }, api) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
    this._api = api;
  }

  getUserInfo(data) {
      this._name.textContent = data.name;
      this._about.textContent = data.about;
      this._avatar.src = data.avatar;
  }

  editUserInfo(inputNameSelector, inputAboutSelector) {
    inputNameSelector.value = this._name.textContent;
    inputAboutSelector.value = this._about.textContent;
  }

  setUserInfo(data) {
    this._api.editProfile(data).then(() => {
      this._name.textContent = data.name;
      this._about.textContent = data.about;
    });
  }

  setUserAvatar(userUrl) {
    this._api.editAvatar(userUrl).then((res)=> {
      this._avatar.src = res.avatar;
    })
  }
}

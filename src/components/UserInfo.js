export class UserInfo {
  constructor({ name, about, avatar }) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
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
    this._name.textContent = data.name;
    this._about.textContent = data.about;
  }

  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  }
}

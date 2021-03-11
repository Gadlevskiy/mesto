export class UserInfo {
  constructor({ name, description }) {
    this._name = name;
    this._description = description;
  }

  getUserInfo(inputNameSelector, inputDescriptionSelector) {
    inputNameSelector.value = this._name.textContent;
    inputDescriptionSelector.value = this._description.textContent;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._description.textContent = data.description;
  }
}

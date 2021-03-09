export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._inputList = Array.from(this.popupSelector.querySelectorAll('input'));
  }

  _getInputValues() {
    this._inputList.map(item => item.value);
  }

  close() {
    super.close();
    this.popupSelector.querySelector('.popup__form').reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this.popupSelector.setEventListeners('submit', this._formSubmit);
  }
}

import { Popup } from './Popup.js';
export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._form = popupSelector.querySelector('.popup__form');
    this._formBtn = this._form.querySelector('.popup__btn-add-profile')
    this._formSubmit = formSubmit;
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  addPreloader() {
    this._formBtn.textContent = 'Сохранение...';
  }

  removePreloader(text) {
    this._formBtn.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      this._formSubmit(evt, this._getInputValues());
    });
  }
}

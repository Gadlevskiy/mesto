import { Popup } from './Popup.js';
export class PopupWithForm extends Popup {
  constructor(popupSelector, currentInputs, formSubmit, ) {
    super(popupSelector);
    this._form = popupSelector.querySelector('.popup__form');
    this._formSubmit = formSubmit;
    this._values = currentInputs;
  }

  _getInputValues() {
    // return this._values = {
    //   name: this._form.querySelector('.popup__input_type_name').value,
    //   link: this._form.querySelector('.popup__input_type_url-image').value
    // }
  }

  close() {
    super.close();
    this._popup.querySelector('.popup__form').reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => this._formSubmit(evt, this._values()));
  }
}

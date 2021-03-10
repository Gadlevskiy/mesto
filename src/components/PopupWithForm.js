import { Popup } from './Popup.js';
export class PopupWithForm extends Popup {
  constructor(popupSelector, currentInputs, formSubmit, ) {
    super(popupSelector);
    this._form = popupSelector.querySelector('.popup__form');
    this._formSubmit = formSubmit;
    this._values = currentInputs;
  }

  _getInputValues() {
  }

  close() {
    super.close();
    this._popup.querySelector('.popup__form').reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      this._formSubmit(evt, this._values());
      this.close();
    });
  }
}

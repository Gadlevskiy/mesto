import { Popup } from './Popup.js';
export class PopupWithPremission extends Popup {
  constructor(popupSelector, deleteCard) {
    super(popupSelector);
    this._handleDeleteCard = deleteCard;
    this._form = popupSelector.querySelector('.popup__form');
    this._premissionBtn = this._popup.querySelector('.popup__btn-add-profile');
    this._id = '';
  }

  returnId(id) {
    this._id = id;
  }

  close() {
    super.close();
    this._id = '';
  }

  addPreloader() {
    this._premissionBtn.textContent = 'Удаление...';
  }

  removePreloader(text) {
    this._premissionBtn.textContent = text;
  }


  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt)=>{
      evt.preventDefault();
      this._handleDeleteCard(evt, this._id);
    })
  }
}

import { Popup } from './Popup.js';
export class PopupWithPremission extends Popup {
  constructor(popupSelector, deleteCard) {
    super(popupSelector);
    this._handleDeleteCard = deleteCard;
    this._premissionBtn = this._popup.querySelector('.popup__btn-add-profile');
  }
  setEventListeners() {
    super.setEventListeners();
  }
}

import { Popup } from './Popup.js';
export class PopupWithPremission extends Popup {
  constructor(popupSelector, api) {
    super(popupSelector);
    this._api = api;
    this._premissonBtn = this._popup.querySelector('.popup__btn-add-profile');
  }

  open(id) {
    super.open();
    this._id = id;
    this._premissonBtn.addEventListener('click',this._submit);
  }

  close() {
    super.close();
    console.log(this._premissonBtn.id);
    this._premissonBtn.removeEventListener('click',this._submit);
  }

  _submit() {
    this._api.deleteCard(this._id).then((res)=>{
      document.getElementById(res._id).remove();
      this.close();
    })
  }


  setEventListeners() {
    super.setEventListeners();
  }
}

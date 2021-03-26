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
    this._premissonBtn.addEventListener('click',()=>this._submit(this._id));
  }

  close() {
    super.close();
    this._premissonBtn.removeEventListener('click',()=>this._submit(this._id));
  }

  _submit(id) {
    this._api.deleteCard(id).then(()=>{
      document.getElementById(id).remove();
      this.close();
    })
  }


  setEventListeners() {
    super.setEventListeners();
  }
}

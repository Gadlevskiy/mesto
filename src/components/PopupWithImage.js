// import Popup from './Popup.js';
export class PopupWithImage extends Popup{
  constructor({name, link}, popupSelector, imageSelector, descriptionSelector) {
    super(popupSelector);
    this._name = name;
    this._link = link;
    this._image = imageSelector;
    this._text = descriptionSelector;
  }

  open() {
    super.open();
    this._image.src = this._link;
    this._image.alt = this._name;
    this._text.textContent = this._name;
  }
}

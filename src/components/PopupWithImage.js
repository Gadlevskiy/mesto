import { Popup } from './Popup.js';
export class PopupWithImage extends Popup {
  constructor(popupSelector, imageSelector, descriptionSelector) {
    super(popupSelector);
    this._image = imageSelector;
    this._text = descriptionSelector;
  }

  open({ name, link }) {
    super.open();
    this._image.src = link;
    this._image.alt = name;
    this._text.textContent = name;
  }
}

export class Popup{
  constructor(popupSelector) {
    this._popup = popupSelector;
  }

  open() {
    this._popup.classList.add('overlay_active');
  }

  close() {
    this._popup.classList.remove('overlay_active');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      close();
    }
  }

  setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose);
  }
}

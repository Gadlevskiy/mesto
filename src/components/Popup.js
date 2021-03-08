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
      this.close();
    }
  }

  setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('overlay_active')) {
        this.close();
      } else if (evt.target.classList.contains('popup__btn-close')) {
        this.close();
      }
    });
  }
}

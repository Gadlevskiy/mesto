export class Card {
  constructor(
    data,
    userTemplate,
    previewPicture
  ) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._userTemplate = userTemplate;
    this._previewPicture = previewPicture;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._userTemplate)
      .content.cloneNode(true);
    return cardElement;
  }

  render() {
    this._view = this._getTemplate();
    this._cardImage = this._view.querySelector('.elements__image');
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._view.querySelector('.elements__title').textContent = this._name;
    return this._view;
  }

  _handleDeleteCard(evt) {
    evt.target.closest('.elements__element').remove();
  }

  _handleLikeIcon(btn) {
    btn.classList.toggle('elements__like-btn_type_active');
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => this._previewPicture(this._data));
    const likeBtn = this._view.querySelector('.elements__like-btn');
    likeBtn.addEventListener('click', () => this._handleLikeIcon(likeBtn));
    this._view
      .querySelector('.elements__delete-btn')
      .addEventListener('click', this._handleDeleteCard);
  }
}

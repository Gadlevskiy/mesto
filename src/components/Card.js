export class Card {
  constructor(
    data,
    userTemplate,
    previewPicture,
    likeIcon
  ) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._userTemplate = userTemplate;
    this._previewPicture = previewPicture;
    this._likeIcon = likeIcon;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._userTemplate)
      .content.cloneNode(true);
    return cardElement;
  }

  render() {
    this._view = this._getTemplate();
    this._setEventListeners();
    this._view.querySelector('.elements__image').src = this._link;
    this._view.querySelector('.elements__image').alt = this._name;
    this._view.querySelector('.elements__title').textContent = this._name;
    return this._view;
  }

  _handleDeleteCard(evt) {
    evt.target.closest('.elements__element').remove();
  }

  _setEventListeners() {
    this._view
      .querySelector('.elements__image')
      .addEventListener('click', () => this._previewPicture(this._data));
    const likeBtn = this._view.querySelector('.elements__like-btn');
    likeBtn.addEventListener('click', () => this._likeIcon(likeBtn));
    this._view
      .querySelector('.elements__delete-btn')
      .addEventListener('click', this._handleDeleteCard);
    this._view.addEventListener('click', this._handleCardClick);
  }
}

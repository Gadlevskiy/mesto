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

  render(isMine) {
    this._view = this._getTemplate();
    this._cardImage = this._view.querySelector('.elements__image');
    this._deleteIcon = this._view.querySelector('.elements__delete-btn');
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._view.querySelector('.elements__title').textContent = this._name;
    if (!isMine) {
      this._deleteIcon.remove();
    }
    return this._view;
  }

  _handleDeleteCard(evt) {
    evt.target.closest('.elements__element').remove();
  }

  // _handleLikeIcon(btn) {
  //   btn.classList.toggle('elements__like-btn_type_active');
  // }

  _handleLikeIcon(btn) {
    const numberOfLikes = btn.parentNode.querySelector('.elements__like-count');
    if (!btn.classList.contains('elements__like-btn_type_active')) {
      btn.classList.add('elements__like-btn_type_active');
      numberOfLikes.textContent = +(numberOfLikes.textContent) + 1;
    } else {
      btn.classList.remove('elements__like-btn_type_active');
      numberOfLikes.textContent = +(numberOfLikes.textContent) - 1;
    }
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => this._previewPicture(this._data));
    const likeBtn = this._view.querySelector('.elements__like-btn');
    likeBtn.addEventListener('click', () => this._handleLikeIcon(likeBtn));
    this._deleteIcon
      .addEventListener('click', this._handleDeleteCard);
  }
}

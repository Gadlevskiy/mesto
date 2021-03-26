export class Card {
  constructor(
    data,
    userTemplate,
    previewPicture,
    api,
    handleDeleteCard,
    author
  ) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._userTemplate = userTemplate;
    this._previewPicture = previewPicture;
    this._api = api;
    this._handleDeleteCard = handleDeleteCard;
    this._author = author;
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
    this._view.querySelector(
      '.elements__like-count'
    ).textContent = this._likes.length;
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._view.querySelector('.elements__element').id = this._data._id;
    this._view.querySelector('.elements__title').textContent = this._name;
    if (isMine != this._author.name) {
      this._deleteIcon.remove();
    }
    return this._view;
  }

  _handleLikeIcon(btn) {
    const numberOfLikes = btn.parentNode.querySelector('.elements__like-count');
    if (!btn.classList.contains('elements__like-btn_type_active')) {
      this._api.like(this._data._id).then((cardRes) => {
        btn.classList.add('elements__like-btn_type_active');
        numberOfLikes.textContent = cardRes.likes.length;
      });
    } else {
      this._api.unlike(this._data._id).then((cardRes) => {
        btn.classList.remove('elements__like-btn_type_active');
        numberOfLikes.textContent = cardRes.likes.length;
      });
    }
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () =>
      this._previewPicture(this._data)
    );
    const likeBtn = this._view.querySelector('.elements__like-btn');
    likeBtn.addEventListener('click', () => this._handleLikeIcon(likeBtn));
    this._deleteIcon.addEventListener('click', this._handleDeleteCard);
  }
}

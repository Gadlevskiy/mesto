import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
const initialCards = [
  {
    name: 'Архыз',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

const overlayEdit = document.querySelector('.overlay_type_edit');
const overlayAdd = document.querySelector('.overlay_type_add');
const editButton = document.querySelector('.profile__btn-edit');
const addButton = document.querySelector('.profile__btn-add-content');
const formDataForValidate = {
  inputSelector: '.popup__input',
  btnAddDisableModify: 'popup__btn-add-profile_disabled',
  inputTypeErrModify: 'popup__input_type_error',
  inputErrActiveModify: 'popup__input-error_active',
  buttonSubmit: 'button[type="submit"]',
};
const popupProfileForm = overlayEdit.querySelector('.popup__form');
const profileFormValidate = new FormValidator(
  formDataForValidate,
  popupProfileForm
);
// const closeProfileButton = overlayEdit.querySelector('.popup__btn-close');
const popupContentForm = overlayAdd.querySelector('.popup__form');
const contentFormValidate = new FormValidator(
  formDataForValidate,
  popupContentForm
);
// const closeContentButton = overlayAdd.querySelector('.popup__btn-close');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const inputName = overlayEdit.querySelector('.popup__input_type_name');
const inputDescription = overlayEdit.querySelector(
  '.popup__input_type_description'
);
const cardsList = document.querySelector('.elements__list');
const overlayPreview = document.querySelector('.overlay_type_preview');
// const previewButtonClose = overlayPreview.querySelector('.preview__btn-close');
const previewDescription = overlayPreview.querySelector(
  '.preview__description'
);
const previewPicture = overlayPreview.querySelector('.preview__picture');
const inputContentName = overlayAdd.querySelector('.popup__input_type_name');
const inputContentLink = overlayAdd.querySelector(
  '.popup__input_type_url-image'
);

function openPopup(popup) {
  popup.classList.add('overlay_active');
  document.addEventListener('keydown', handleEscKey);
}

function closePopup(popup) {
  popup.classList.remove('overlay_active');
  document.removeEventListener('keydown', handleEscKey);
}

function activatePopupProfile() {
  openPopup(overlayEdit);
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

function submitPopupToProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(overlayEdit);
}

function handleDeleteCard(evt) {
  evt.target.closest('.elements__element').remove();
}

function handlePreviewPicture(el) {
  openPopup(overlayPreview);
  previewPicture.src = el.link;
  previewPicture.alt = el.name;
  previewDescription.textContent = el.name;
}

function handleLikeIcon(item) {
  item.classList.toggle('elements__like-btn_type_active');
}

function renderCard(data, wrap) {
  const card = new Card(
    data,
    '.form-template',
    handleDeleteCard,
    handlePreviewPicture,
    handleLikeIcon
  );
  const cardElement = card.render();
  wrap.prepend(cardElement);
}

function submitContentToCard(evt) {
  evt.preventDefault();
  const newCard = {
    name: inputContentName.value,
    link: inputContentLink.value,
  };
  renderCard(newCard, cardsList);
  closePopup(overlayAdd);
  popupContentForm.reset();
}

function handleEscKey(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.overlay_active');
    closePopup(openedPopup);
  }
}

// function handlePopupOuterSpace(event) {
//   if (event.target === event.currentTarget) {
//     closePopup(event.currentTarget);
//   }
// }

initialCards.forEach((data) => {
  renderCard(data, cardsList);
});

const overlays = document.querySelectorAll('.overlay');
overlays.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('overlay_active')) {
      closePopup(popup);
    } else if (evt.target.classList.contains('popup__btn-close')) {
      closePopup(popup);
    }
  });
});

// overlayAdd.addEventListener('click', handlePopupOuterSpace);
// overlayEdit.addEventListener('click', handlePopupOuterSpace);
// overlayPreview.addEventListener('click', handlePopupOuterSpace);
editButton.addEventListener('click', () => {
  activatePopupProfile();
  profileFormValidate.resetValidation();
});
// closeProfileButton.addEventListener('click', () => closePopup(overlayEdit));
popupProfileForm.addEventListener('submit', submitPopupToProfile);
addButton.addEventListener('click', () => {
  openPopup(overlayAdd);
  contentFormValidate.resetValidation();
});
// closeContentButton.addEventListener('click', () => closePopup(overlayAdd));
popupContentForm.addEventListener('submit', submitContentToCard);
// previewButtonClose.addEventListener('click', () => closePopup(overlayPreview));
profileFormValidate.enableValidation();
contentFormValidate.enableValidation();

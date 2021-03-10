import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Section } from '../components/Section.js';
// import { UserInfo } from '../components/UserInfo.js';
import '../pages/index.css';
import { from } from 'webpack-sources/lib/CompatSource';

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
const overlays = document.querySelectorAll('.overlay');
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
const popupContentForm = overlayAdd.querySelector('.popup__form');
const contentFormValidate = new FormValidator(
  formDataForValidate,
  popupContentForm
);
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const inputName = overlayEdit.querySelector('.popup__input_type_name');
const inputDescription = overlayEdit.querySelector(
  '.popup__input_type_description'
);
const cardsList = document.querySelector('.elements__list');
const overlayPreview = document.querySelector('.overlay_type_preview');
const previewDescription = overlayPreview.querySelector('.popup__description');
const previewPicture = overlayPreview.querySelector('.popup__preview-picture');
const inputContentName = overlayAdd.querySelector('.popup__input_type_name');
const inputContentLink = overlayAdd.querySelector(
  '.popup__input_type_url-image'
);
const section = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = new Card(data, '.form-template', () => {
        const popupWithImage = new PopupWithImage(
          data,
          overlayPreview,
          previewPicture,
          previewDescription
        );
        popupWithImage.setEventListeners();
        popupWithImage.open();
      });
      const sectionElement = card.render();
      cardsList.prepend(sectionElement);
    },
  },
  cardsList
);
const popupWithContent = new PopupWithForm(
  overlayAdd,
  () => {
    const currentInputs = {
      name: inputContentName.value,
      link: inputContentLink.value,
    };
    return currentInputs;
  },
  (evt, data) => {
    evt.preventDefault();
    const newCard = new Card(data, '.form-template', () => {
      const popupWithImage = new PopupWithImage(
        data,
        overlayPreview,
        previewPicture,
        previewDescription
      );
      popupWithImage.setEventListeners();
      popupWithImage.open();
    });
    const sectionElement = newCard.render();
    cardsList.prepend(sectionElement);
    console.log(data);
  }
);

// function openPopup(popup) {
//   popup.classList.add('overlay_active');
//   document.addEventListener('keydown', handleEscKey);
// }

// function closePopup(popup) {
//   popup.classList.remove('overlay_active');
//   document.removeEventListener('keydown', handleEscKey);
// }

// function activatePopupProfile() {
//   openPopup(overlayEdit);
//   inputName.value = profileName.textContent;
//   inputDescription.value = profileDescription.textContent;
// }

// function submitPopupToProfile(evt) {
//   evt.preventDefault();
//   profileName.textContent = inputName.value;
//   profileDescription.textContent = inputDescription.value;
//   closePopup(overlayEdit);
// }

// function renderCard(data, wrap) {
//   const card = new Card(
//     data,
//     '.form-template',
//     handleDeleteCard,
//     handlePreviewPicture,
//     handleLikeIcon
//   );
//   const cardElement = card.render();
//   wrap.prepend(cardElement);
// }

// function handleEscKey(evt) {
//   if (evt.key === 'Escape') {
//     const openedPopup = document.querySelector('.overlay_active');
//     closePopup(openedPopup);
//   }
// }

// initialCards.forEach((data) => {
//   renderCard(data, cardsList);
// });

// overlays.forEach((popup) => {
//   popup.addEventListener('click', (evt) => {
//     if (evt.target.classList.contains('overlay_active')) {
//       closePopup(popup);
//     } else if (evt.target.classList.contains('popup__btn-close')) {
//       closePopup(popup);
//     }
//   });
// });

// editButton.addEventListener('click', () => {
//   activatePopupProfile();
//   profileFormValidate.resetValidation();
// });
// popupProfileForm.addEventListener('submit', submitPopupToProfile);
addButton.addEventListener('click', () => {
  popupContentForm.reset();
  popupWithContent.open();
  popupWithContent.setEventListeners();
  contentFormValidate.resetValidation();
});
// popupContentForm.addEventListener('submit', submitContentToCard);

section.renderAll();
profileFormValidate.enableValidation();
contentFormValidate.enableValidation();

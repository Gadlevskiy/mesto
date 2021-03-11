import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
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
const userProfile = {
  name: document.querySelector('.profile__name'),
  description: document.querySelector('.profile__description'),
};
const inputName = overlayEdit.querySelector('.popup__input_type_name');
const inputDescription = overlayEdit.querySelector(
  '.popup__input_type_description'
);
const cardsList = document.querySelector('.elements__list');
const overlayPreview = document.querySelector('.overlay_type_preview');
const previewDescription = overlayPreview.querySelector('.popup__description');
const previewPicture = overlayPreview.querySelector('.popup__preview-picture');
const section = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = new Card(data, '.form-template', () => {
        popupWithImage.open(data);
      });
      const sectionElement = card.render();
      section.addItem(sectionElement);
    },
  },
  cardsList
);
const popupWithImage = new PopupWithImage(
  overlayPreview,
  previewPicture,
  previewDescription
);
const popupWithContent = new PopupWithForm(overlayAdd, (evt, data) => {
  evt.preventDefault();
  const newCard = new Card(data, '.form-template', () => {
    popupWithImage.open(data);
  });
  const sectionElement = newCard.render();
  section.addItem(sectionElement);
});
const userInfo = new UserInfo(userProfile);
const popupWithUserInfo = new PopupWithForm(overlayEdit, (evt, data) => {
  evt.preventDefault();
  userInfo.setUserInfo(data);
});

editButton.addEventListener('click', () => {
  popupProfileForm.reset();
  userInfo.getUserInfo(inputName, inputDescription);
  popupWithUserInfo.open();
  profileFormValidate.resetValidation();
});
addButton.addEventListener('click', () => {
  popupContentForm.reset();
  popupWithContent.open();
  contentFormValidate.resetValidation();
});

section.renderAll();
popupWithImage.setEventListeners();
popupWithContent.setEventListeners();
popupWithUserInfo.setEventListeners();
profileFormValidate.enableValidation();
contentFormValidate.enableValidation();

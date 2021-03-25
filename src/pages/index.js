import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import '../pages/index.css';
import { from } from 'webpack-sources/lib/CompatSource';

const overlayEdit = document.querySelector('.overlay_type_edit');
const overlayAdd = document.querySelector('.overlay_type_add');
const overlayEditAvatar = document.querySelector('.overlay_type_edit-avatar');
const editButton = document.querySelector('.profile__btn-edit');
const addButton = document.querySelector('.profile__btn-add-content');
const editAvatarButton = document.querySelector('.profile__btn-edit-avatar');
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
  headers: {
    authorization: '86f777a6-b57b-45c3-b6d4-d0ab5095dbcc',
    'Content-Type': 'application/json',
  },
});
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
const popupAvatarForm = overlayEditAvatar.querySelector('.popup__form');
const avatarFormValidate = new FormValidator(
  formDataForValidate,
  popupAvatarForm
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
    renderer: (data) => {
      const card = new Card(data, '.form-template', () => {
        popupWithImage.open(data);
      });
      const sectionElement = card.render(false);
      section.addItem(sectionElement);
    },
  },
  cardsList,
  api
);
section.renderAll();

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
  const sectionElement = newCard.render(true);
  section.addItem(sectionElement);
});
const userInfo = new UserInfo(userProfile);
const popupWithUserInfo = new PopupWithForm(overlayEdit, (evt, data) => {
  evt.preventDefault();
  userInfo.setUserInfo(data);
});
const popupWithAvatar = new PopupWithForm(overlayEditAvatar, (evt) => {
  evt.preventDefault();
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
editAvatarButton.addEventListener('click', () => {
  popupAvatarForm.reset();
  popupWithAvatar.open();
  avatarFormValidate.resetValidation();
});
popupWithImage.setEventListeners();
popupWithContent.setEventListeners();
popupWithUserInfo.setEventListeners();
popupWithAvatar.setEventListeners();
profileFormValidate.enableValidation();
contentFormValidate.enableValidation();
avatarFormValidate.enableValidation();

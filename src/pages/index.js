import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithPremission } from '../components/PopupWithPremission.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import '../pages/index.css';
import { from } from 'webpack-sources/lib/CompatSource';
import { Popup } from '../components/Popup.js';

const overlayEdit = document.querySelector('.overlay_type_edit');
const overlayAdd = document.querySelector('.overlay_type_add');
const overlayEditAvatar = document.querySelector('.overlay_type_edit-avatar');
const overlayPremission = document.querySelector('.overlay_type_permission');
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
  about: document.querySelector('.profile__description'),
  avatar: document.querySelector('.profile__photo'),
};
const inputName = overlayEdit.querySelector('.popup__input_type_name');
const inputDescription = overlayEdit.querySelector('.popup__input_type_about');
const cardsList = document.querySelector('.elements__list');
const overlayPreview = document.querySelector('.overlay_type_preview');
const previewDescription = overlayPreview.querySelector('.popup__description');
const previewPicture = overlayPreview.querySelector('.popup__preview-picture');
api
  .getProfile()
  .then((author) => {
    userInfo.getUserInfo(author);
    const section = new Section(
      {
        renderer: (data) => {
          const card = new Card(
            data,
            '.form-template',
            () => {
              popupWithImage.open(data);
            },
            api,
            (id) => {
              popupPremission.open();
              popupPremission.returnId(id);
            },
            author
          );
          const sectionElement = card.render(data.owner);
          section.addItem(sectionElement);
        },
      },
      cardsList,
      api
    );
    section.renderAll();
    const popupWithContent = new PopupWithForm(overlayAdd, (evt, data) => {
      evt.preventDefault();
      popupWithContent.addPreloader();
      api
        .createCard(data)
        .then((res) => {
          const newCard = new Card(
            res,
            '.form-template',
            () => {
              popupWithImage.open(res);
            },
            api,
            (id) => {
              popupPremission.open();
              popupPremission.returnId(id);
            },
            author
          );
          const sectionElement = newCard.render(res.owner);
          section.addItem(sectionElement);
          popupWithContent.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupWithContent.removePreloader('Создать');
        });
    });

    addButton.addEventListener('click', () => {
      popupContentForm.reset();
      popupWithContent.open();
      contentFormValidate.resetValidation();
    });
    popupWithContent.setEventListeners();
  })
  .catch((err) => {
    console.log(err);
  });

const popupWithImage = new PopupWithImage(
  overlayPreview,
  previewPicture,
  previewDescription
);

const userInfo = new UserInfo(userProfile);
const popupPremission = new PopupWithPremission(
  overlayPremission,
  (evt, data) => {
    evt.preventDefault();
    popupPremission.addPreloader();
    api
      .deleteCard(data)
      .then(() => {
        document.getElementById(data).remove();
        popupPremission.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupPremission.removePreloader('Да');
      });
  }
);
const popupWithUserInfo = new PopupWithForm(overlayEdit, (evt, data) => {
  evt.preventDefault();
  popupWithUserInfo.addPreloader();
  api
    .editProfile(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupWithUserInfo.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithUserInfo.removePreloader('Сохранить');
    });
});
const popupWithAvatar = new PopupWithForm(overlayEditAvatar, (evt, data) => {
  evt.preventDefault();
  popupWithAvatar.addPreloader();
  api
    .editAvatar(data)
    .then((res) => {
      userInfo.setUserAvatar(res);
      popupWithAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithAvatar.removePreloader('Сохранить');
    });
});

editButton.addEventListener('click', () => {
  userInfo.editUserInfo(inputName, inputDescription);
  popupWithUserInfo.open();
  profileFormValidate.resetValidation();
});

editAvatarButton.addEventListener('click', () => {
  popupWithAvatar.open();
  avatarFormValidate.resetValidation();
});
popupWithImage.setEventListeners();

popupWithUserInfo.setEventListeners();
popupWithAvatar.setEventListeners();
popupPremission.setEventListeners();
profileFormValidate.enableValidation();
contentFormValidate.enableValidation();
avatarFormValidate.enableValidation();

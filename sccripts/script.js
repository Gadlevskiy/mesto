const overlayEdit = document.querySelector('.overlay_type_edit')
const overlayAdd = document.querySelector('.overlay_type_add')
const editButton = document.querySelector('.profile__btn-edit')
const addButton = document.querySelector('.profile__btn-add-content')
const popupProfileForm = overlayEdit.querySelector('.popup__form')
const closeProfileButton = overlayEdit.querySelector('.popup__btn-close')
const popupContentForm = overlayAdd.querySelector('.popup__form')
const closeContentButton = overlayAdd.querySelector('.popup__btn-close')
const profileName = document.querySelector('.profile__name')
const profileDescription = document.querySelector('.profile__description')
const inputName = overlayEdit.querySelector('.popup__input_type_name')
const inputDescription = overlayEdit.querySelector('.popup__input_type_description')
const formTamplate = document.querySelector('.form-tamplate').content
const cardsList = document.querySelector('.elements__list')
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]
const overlayPreview = document.querySelector('.overlay_type_preview')
const previewButtonClose = overlayPreview.querySelector('.preview__btn-close')
const previewDescription = overlayPreview.querySelector('.preview__description')
const previewPicture = overlayPreview.querySelector('.preview__picture')

function popupProfileActive() {
  overlayEdit.classList.add('overlay_active')
  inputName.value = profileName.textContent
  inputDescription.value = profileDescription.textContent
}

function popupProfileDisable() {
  overlayEdit.classList.remove('overlay_active')
}

function popupProfileSubmit(evt) {
  evt.preventDefault()
  profileName.textContent = inputName.value
  profileDescription.textContent = inputDescription.value
  popupProfileDisable()
}

editButton.addEventListener('click', popupProfileActive)
closeProfileButton.addEventListener('click', popupProfileDisable)
popupProfileForm.addEventListener('submit', popupProfileSubmit)

function popupContentActive() {
  overlayAdd.classList.add('overlay_active')
}

function popupContentDisable() {
  overlayAdd.classList.remove('overlay_active')
}

addButton.addEventListener('click', popupContentActive)
closeContentButton.addEventListener('click', popupContentDisable)

function popupContentDelete(evt) {
  evt.target.closest('.elements__element').remove()
}

function previewDisable() {
  overlayPreview.classList.remove('overlay_active')
}

function insertTamplate(el) {
  const userTamplate = formTamplate.cloneNode(true)
  userTamplate.querySelector('.elements__title').textContent = el.name
  userTamplate.querySelector('.elements__image').src = el.link
  userTamplate.querySelector('.elements__image').alt = el.name
  userTamplate.querySelector('.elements__image').addEventListener('click', ()=> {
    overlayPreview.classList.add('overlay_active')
    previewPicture.src = el.link
    previewDescription.textContent = el.name
  })
  const likeButton = userTamplate.querySelector('.elements__like-btn')
  likeButton.addEventListener('click', ()=> {
    likeButton.classList.toggle('elements__like-btn_type_active')
  })
  userTamplate.querySelector('.elements__delete-btn').addEventListener('click', popupContentDelete)
  cardsList.prepend(userTamplate)
}

previewButtonClose.addEventListener('click', previewDisable)

initialCards.forEach(insertTamplate)

const inputContentName = overlayAdd.querySelector('.popup__input_type_name')
const inputContentLink = overlayAdd.querySelector('.popup__input_type_url-image')

function popupContentSubmit(evt) {
  evt.preventDefault()
  const mergeContent = [{ name: '', link: ''}]
  mergeContent.name = inputContentName.value
  mergeContent.link = inputContentLink.value
  insertTamplate(mergeContent)
  popupContentDisable()
  inputContentName.value = ''
  inputContentLink.value = ''
}

popupContentForm.addEventListener('submit', popupContentSubmit)


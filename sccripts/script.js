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

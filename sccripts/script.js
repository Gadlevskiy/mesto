let overlay = document.querySelector('.overlay')
let editButton = document.querySelector('.profile__btn-edit')
let popupForm = overlay.querySelector('.popup__form')
let closeButton = document.querySelector('.popup__btn-close')
let profileName = document.querySelector('.profile__name')
let profileDescription = document.querySelector('.profile__description')
let inputName = overlay.querySelector('.popup__input_type_name')
let inputDescription = overlay.querySelector('.popup__input_type_description')

function popupActive() {
  overlay.classList.add('overlay_active')
  inputName.value = profileName.textContent
  inputDescription.value = profileDescription.textContent
}

function popupDisable() {
  overlay.classList.remove('overlay_active')
}

function popupSubmit(evt) {
  evt.preventDefault()
  profileName.textContent = inputName.value
  profileDescription.textContent = inputDescription.value
  popupDisable()
}

editButton.addEventListener('click', popupActive)
closeButton.addEventListener('click', popupDisable)
popupForm.addEventListener('submit', popupSubmit)

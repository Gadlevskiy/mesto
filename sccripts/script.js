let likeButton = document.querySelectorAll('.elements__like-btn')

for (var i=0; i < likeButton.length; i += 1) {
  likeButton[i].addEventListener('click' , function() {
    this.classList.toggle('elements__like-btn_active')
})};

let overlay = document.querySelector('.overlay')
function TogglePopup() {
  overlay.classList.toggle('overlay_active')
}

let editButton = document.querySelector('.profile__btn-edit')
let addProfileButton = overlay.querySelector('.popup__btn-add-profile')
let closeButton = document.querySelector('.popup__btn-close')
let profileName = document.querySelector('.profile__name')
let profileDescription = document.querySelector('.profile__description')
let inputName = overlay.querySelector('.popup__input-name')
let inputDescription = overlay.querySelector('.popup__input-description')

editButton.addEventListener('click', event => {
  event.preventDefault()
  TogglePopup()
  inputName.value = profileName.textContent
  console.log(inputName.value)
  inputDescription.value = profileDescription.textContent
})

addProfileButton.addEventListener('click', event => {
  event.preventDefault()
  profileName.textContent = inputName.value
  console.log(profileName.innerHTML)
  profileDescription.textContent = inputDescription.value
  TogglePopup()
})

closeButton.addEventListener('click', TogglePopup)

overlay.addEventListener('click', event => {
  if (event.target === event.currentTarget) {
    TogglePopup()
  }
})

let formPopup = overlay.querySelector('.popup__form')
formPopup.addEventListener('submit', handleFormSubmit)


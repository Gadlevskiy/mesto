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
let closeButton = document.querySelector('.popup__btn-close')

editButton.addEventListener('click', event => {
  event.preventDefault()
  TogglePopup()
})

closeButton.addEventListener('click', TogglePopup)

overlay.addEventListener('click', event => {
  if (event.target === event.currentTarget) {
    TogglePopup()
  }
})

let form = overlay.querySelector('.popup__form')

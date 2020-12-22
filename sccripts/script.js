let likeButton = document.querySelector('.elements__like-btn');
console.log(likeButton)
function likeswitch() {
  likeButton.classList.toggle('.elements__like-btn_active')
}
likeButton.addEventListener('click', likeswitch());

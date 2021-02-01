const overlayEdit = document.querySelector(".overlay_type_edit");
const overlayAdd = document.querySelector(".overlay_type_add");
const editButton = document.querySelector(".profile__btn-edit");
const addButton = document.querySelector(".profile__btn-add-content");
const popupProfileForm = overlayEdit.querySelector(".popup__form");
const closeProfileButton = overlayEdit.querySelector(".popup__btn-close");
const popupContentForm = overlayAdd.querySelector(".popup__form");
const closeContentButton = overlayAdd.querySelector(".popup__btn-close");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const inputName = overlayEdit.querySelector(".popup__input_type_name");
const inputDescription = overlayEdit.querySelector(
  ".popup__input_type_description"
);
const formTemplate = document.querySelector(".form-template").content;
const cardsList = document.querySelector(".elements__list");
const overlayPreview = document.querySelector(".overlay_type_preview");
const previewButtonClose = overlayPreview.querySelector(".preview__btn-close");
const previewDescription = overlayPreview.querySelector(
  ".preview__description"
);
const previewPicture = overlayPreview.querySelector(".preview__picture");
const inputContentName = overlayAdd.querySelector(".popup__input_type_name");
const inputContentLink = overlayAdd.querySelector(
  ".popup__input_type_url-image"
);

function openPopup(popup) {
  popup.classList.add("overlay_active");
}

function closePopup(popup) {
  popup.classList.remove("overlay_active");
}

function activatePopupProfile() {
  openPopup(overlayEdit);
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

function submitPopupToProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(overlayEdit);
}

function handleDeleteCard(evt) {
  evt.target.closest(".elements__element").remove();
}

function handlePreviewPicture(el) {
  openPopup(overlayPreview);
  previewPicture.src = el.link;
  previewPicture.alt = el.name;
  previewDescription.textContent = el.name;
}

function handleLikeIcon(item) {
  item.classList.toggle("elements__like-btn_type_active");
}

function handleCreateCard(el) {
  const userTemplate = formTemplate.cloneNode(true);
  const userImage = userTemplate.querySelector(".elements__image");
  const likeButton = userTemplate.querySelector(".elements__like-btn");
  const userText = userTemplate.querySelector(".elements__title");
  userText.textContent = el.name;
  userImage.src = el.link;
  userImage.alt = el.name;
  userImage.addEventListener("click", () => handlePreviewPicture(el));
  likeButton.addEventListener("click", () => handleLikeIcon(likeButton));
  userTemplate
    .querySelector(".elements__delete-btn")
    .addEventListener("click", handleDeleteCard);
  return userTemplate;
}

function renderCard(data, wrap) {
  wrap.prepend(handleCreateCard(data));
}

function submitContentToCard(evt) {
  evt.preventDefault();
  const newCard = {
    name: inputContentName.value,
    link: inputContentLink.value,
  };
  renderCard(newCard, cardsList);
  closePopup(overlayAdd);
  popupContentForm.reset();
}

initialCards.forEach((data) => {
  renderCard(data, cardsList);
});

editButton.addEventListener("click", activatePopupProfile);
closeProfileButton.addEventListener("click", () => closePopup(overlayEdit));
popupProfileForm.addEventListener("submit", submitPopupToProfile);
addButton.addEventListener("click", () => openPopup(overlayAdd));
closeContentButton.addEventListener("click", () => closePopup(overlayAdd));
popupContentForm.addEventListener("submit", submitContentToCard);
previewButtonClose.addEventListener("click", () => closePopup(overlayPreview));

import '../../pages/index.css';
import { toggleButtonState, hideInputError } from './validate.js';
import { cardNameInput, cardPhotoInput, popupProfile, config, buttonCloseImage,
  buttonCloseInputPlace, closePopupBigImage, profileButtonEdit, buttonCloseInputProfile,
  profileButtonAdd, popupPlace, nameInput, avatarProfile, nameProfile, jobInput, jobProfile,
  avatarButton, popupAvatar, buttonCloseInputAvatar, avatarProfileInput } from './utils.js';
import { openPopup, closePopup } from './modal.js';
import { getUsersInfo, getInitialCards, editProfile, addNewCard, changeAvatar } from './api.js';
import { renderInitialCards, renderNewCard } from './card.js';

let userId = null;

function renderProfile(data) { // рендер профиля
    avatarProfile.style.backgroundImage = `url("${data.avatar}")`;
    nameProfile.textContent = data.name;
    jobProfile.textContent = data.about;  
}


function renderPage() {  //рендер страницы
  const profile = getUsersInfo();
  const cardsInitial = getInitialCards();
  Promise.all([profile, cardsInitial])
  .then((data) => {
    const [profileData, cardsInitialData] = data;
    userId = profileData._id;
    renderProfile(profileData);
    renderInitialCards(cardsInitialData, userId);
  })
  .catch((err) => {
    console.log(err);
  })
}


function renderLoading(isLoading, popup) {
  const button = popup.querySelector(".popup__button-save");
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = button.value;
  }
}


avatarButton.addEventListener("click", () => { // открыть редактирование аватара
  const formElement = popupAvatar.querySelector(".popup__container");
  const inputElement = formElement.querySelector(".popup__input");
  const buttonElement = formElement.querySelector(".popup__button-save");

  hideInputError(formElement, inputElement, config);
  inputElement.classList.remove("popup__input_error");
  inputElement.setCustomValidity("");
  
  avatarProfileInput.value = avatarProfile.style.backgroundImage;

  toggleButtonState(inputElement, buttonElement, config);

  openPopup(popupAvatar);
});


function handleFormSubmitAvatar(evt) { //функция сохранения аватара
  evt.preventDefault();
  renderLoading(true, popupAvatar)
  changeAvatar({
    avatar: avatarProfileInput.value,
  })
  .then((data) => {
    avatarProfile.style.backgroundImage = `url("${data.avatar}")`;
    avatarProfileInput.value = "";
    closePopup(popupAvatar);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(false, popupAvatar)
  })   
};


profileButtonEdit.addEventListener("click", () => { // открыть редактирование профиля
  const formElement = popupProfile.querySelector(".popup__container");
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button-save");

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
    inputElement.classList.remove(".popup__input_error");
    inputElement.setCustomValidity("");
  });

  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;

  toggleButtonState(inputList, buttonElement, config);

  openPopup(popupProfile);
});


function handleFormSubmit(evt) { // функция сохранения профиля
  evt.preventDefault();
  renderLoading(true, popupProfile) 
  editProfile({
    name: nameInput.value,
    about: jobInput.value,
  })
  .then((data) => {
    nameProfile.textContent = data.name;
    jobProfile.textContent = data.about;
    closePopup(popupProfile);
  })
  .catch((err) => {
    console.log(err);
  })  
  .finally(() => {
    renderLoading(false, popupProfile);
  })
};


profileButtonAdd.addEventListener("click", () => { // открыть форму добавления карточки
  const formElement = popupPlace.querySelector(".popup__container");
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button-save");

  inputList.forEach((inputElement) => {
    inputElement.value = "";
    hideInputError(formElement, inputElement, config);
    inputElement.classList.remove(".popup__input_error");
    inputElement.setCustomValidity("");
  });

  toggleButtonState(inputList, buttonElement, config);

  openPopup(popupPlace);
});
  

function handleFormSubmitPlace(evt) { //функция сохранения в карточки
    evt.preventDefault();
    renderLoading(true, popupPlace);
    addNewCard({
      name: cardNameInput.value,
      link: cardPhotoInput.value,
    })
    .then((data) => {
      renderNewCard(data, userId);
      cardPhotoInput.value = '';
      cardNameInput.value = '';
      closePopup(popupPlace);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupPlace);
    })
  };


renderPage();

buttonCloseInputProfile.addEventListener("click", () => closePopup(popupProfile)); // закрыть редактирование профиля

buttonCloseInputPlace.addEventListener("click", () => closePopup(popupPlace)); // закрыть форму добавления карточки

buttonCloseImage.addEventListener("click", closePopupBigImage); // закрыть попап с фото

buttonCloseInputAvatar.addEventListener("click", () => closePopup(popupAvatar)); // закрыть попап с аватаром

popupProfile.addEventListener("submit", handleFormSubmit);

popupPlace.addEventListener("submit", handleFormSubmitPlace);

popupAvatar.addEventListener("submit", handleFormSubmitAvatar);
  

  

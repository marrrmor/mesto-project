import '../../pages/index.css';
import { toggleButtonState, hideInputError } from './validate.js';
import { cardNameInput, cardPhotoInput, popupProfile, config, buttonCloseImage, buttonCloseInputPlace, closePopupBigImage, profileButtonEdit, buttonCloseInputProfile, profileButtonAdd, popupPlace, nameInput, nameProfile, jobInput, jobProfile } from './utils.js';
import { openPopup, closePopup } from './modal.js'
import { createCard, placesSet } from './card.js';


const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
  


function closePopupPlace() { // функция отключает стили для окна попапа новых мест 
  closePopup(popupPlace);
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

  
function handleFormSubmit(evt) { // функция сохранения профиля
    evt.preventDefault();
  
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup(popupProfile);
}
  
  
function handleFormSubmitPlace(evt) { //функция сохранения в карточки
    evt.preventDefault();
  
    const newCardElement = createCard(cardPhotoInput.value, cardNameInput.value);
    placesSet.prepend(newCardElement);
  
    cardPhotoInput.value = '';
    cardNameInput.value = '';
    closePopupPlace();
}

function addInitialCards() {
  initialCards.forEach(function(item) {
    const placeElement = createCard(item.link, item.name);
    placesSet.append(placeElement);
  });
}

addInitialCards();

buttonCloseInputProfile.addEventListener("click", () => closePopup(popupProfile)) // закрыть редактирование профиля

buttonCloseInputPlace.addEventListener("click", closePopupPlace); // закрыть форму добавления карточки

buttonCloseImage.addEventListener("click", closePopupBigImage); // закрыть попап с фото

popupProfile.addEventListener("submit", handleFormSubmit);

popupPlace.addEventListener("submit", handleFormSubmitPlace);
  

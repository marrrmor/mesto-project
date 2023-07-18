import '../../pages/index.css';
import { toggleButtonState, hideInputError } from './validate.js';
import { cardNameInput, cardPhotoInput, config } from './utils.js';
import { openPopup, closePopup, popupProfile } from './modal.js'
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
  
const nameInput = document.querySelector(".popup__input_type_name");            /*Инпут имя*/
const jobInput = document.querySelector(".popup__input_type_description");      /*Инпут профессия*/
const nameProfile = document.querySelector(".profile__title");                  
const jobProfile = document.querySelector(".profile__subtitle");
const popupPlace = document.querySelector(".popup.popup__input-place");                      /*Попап добавления карточки*/
const namePicturePopup = document.querySelector(".popup__big-image-name");
const picturePopup = document.querySelector(".popup__big-image-photo");
const buttonCloseInputProfile = document.querySelector(".popup__button-close_input-profile");      //кнопка закрыть попап профиля

function closePopupPlace() { // функция отключает стили для окна попапа новых мест 
  closePopup(popupPlace);
};


const popupBigImage = document.querySelector(".popup.popup__big-image");
// функция подключает стили для попапа галереи
function openPopupBigImage() {
  openPopup(popupBigImage);
}

// функция отключает стили для попапа галереи
function closePopupBigImage() {
  closePopup(popupBigImage);
}

const profileButtonEdit = document.querySelector(".profile__button-edit"); 

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



buttonCloseInputProfile.addEventListener("click", () => closePopup(popupProfile)) // закрыть редактирование профиля


const profileButtonAdd = document.querySelector(".profile__button-add");        /*кнопка добавления карточки*/

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
 

const buttonCloseInputPlace = document.querySelector(".popup__button-close_input-place");      //кнопка закрыть попап профиля

buttonCloseInputPlace.addEventListener("click", closePopupPlace); // закрыть форму добавления карточки

function openPhoto(evt) {
  const photoCard = evt.target.closest('.place');
  const photoImage = photoCard.querySelector('.place__photo');
  const photoName = photoCard.querySelector('.place__name');

  openPopupBigImage();
  
    picturePopup.src = photoImage.src;
    picturePopup.alt = photoImage.alt;
    namePicturePopup.textContent = photoName.textContent;
}

const buttonCloseImage = document.querySelector(".popup__button-close_big-image");          //кнопка закрыть попап с фото

buttonCloseImage.addEventListener("click", closePopupBigImage); // закрыть попап с фото

popupProfile.addEventListener("submit", handleFormSubmit);
popupPlace.addEventListener("submit", handleFormSubmitPlace);

  
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
  
export { nameInput, jobInput, nameProfile, jobProfile, handleFormSubmit, handleFormSubmitPlace, openPhoto };
  
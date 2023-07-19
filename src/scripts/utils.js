import { openPopup, closePopup } from './modal.js'

export const cardNameInput = document.querySelector(".popup__input_type_card-name");   //Инпут название места
export const cardPhotoInput = document.querySelector(".popup__input_type_card-photo"); //Инпут ссылка на изображение
export const buttonCloseImage = document.querySelector(".popup__button-close_big-image");          //кнопка закрыть попап с фото
export const buttonCloseInputPlace = document.querySelector(".popup__button-close_input-place");      //кнопка закрыть попап профиля
export const nameInput = document.querySelector(".popup__input_type_name");            /*Инпут имя*/
export const jobInput = document.querySelector(".popup__input_type_description");      /*Инпут профессия*/
export const nameProfile = document.querySelector(".profile__title");                  
export const jobProfile = document.querySelector(".profile__subtitle");
export const popupPlace = document.querySelector(".popup.popup__input-place");                      /*Попап добавления карточки*/
export const buttonCloseInputProfile = document.querySelector(".popup__button-close_input-profile");      //кнопка закрыть попап профиля
export const profileButtonEdit = document.querySelector(".profile__button-edit"); 
export const profileButtonAdd = document.querySelector(".profile__button-add");        /*кнопка добавления карточки*/
export const popupProfile = document.querySelector(".popup.popup__input-profile");     /*Попап изменения профиля*/

const popupBigImage = document.querySelector(".popup.popup__big-image"); //Попап галереи фото
const namePicturePopup = document.querySelector(".popup__big-image-name");
const picturePopup = document.querySelector(".popup__big-image-photo");

const config = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button-save",
    inactiveButtonClass: "popup__button-save_disabled",
    inputErrorClass: "popup__input_error", 
    popupContainer: ".popup__container",
    textError: "popup__input_text-error"
  }

function openPopupBigImage() {  // функция подключает стили для попапа галереи
    openPopup(popupBigImage);
  }

function closePopupBigImage() {  // функция отключает стили для попапа галереи
    closePopup(popupBigImage);
  }

function openPhoto(evt) {
    const photoCard = evt.target.closest('.place');
    const photoImage = photoCard.querySelector('.place__photo');
    const photoName = photoCard.querySelector('.place__name');
  
    openPopupBigImage();
    
      picturePopup.src = photoImage.src;
      picturePopup.alt = photoImage.alt;
      namePicturePopup.textContent = photoName.textContent;
  }



export { config, openPhoto, closePopupBigImage };
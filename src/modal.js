import { nameInput, jobInput, nameProfile, jobProfile, handleFormSubmit, handleFormSubmitPlace } from './index.js';
import { cardNameInput, cardPhotoInput } from './utils.js';

const popupPlace = document.querySelector(".popup.popup__input-place");                      /*Попап добавления карточки*/
const namePicturePopup = document.querySelector(".popup__big-image-name");
  const picturePopup = document.querySelector(".popup__big-image-photo");
  const popupProfile = document.querySelector(".popup.popup__input-profile");     /*Попап изменения профиля*/
  

// функция подключает общие стили для попап-окон
function openPopup(popup) {
    popup.classList.add("popup_opened");
  } 
  
  // функция отключает стили для открытых попап-окон
  function closePopup(popup) {
    popup.classList.remove("popup_opened");
  }
  
  
  //функция отключает попап при нажатии esc и на overlay
  document.querySelectorAll(".popup").forEach((popup) => {
    document.addEventListener ("keydown", function (evt) {
      if (evt.key === "Escape") {
        closePopup(popup);
      }
    });
  
    document.addEventListener ("click", function(evt) {
      if (evt.target.classList.contains("popup_opened")) {
        closePopup(popup);
      }
    });
  });
  
  
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
    nameInput.value = nameProfile.textContent; 
    jobInput.value = jobProfile.textContent;
    openPopup(popupProfile)
  });
  
  const buttonCloseInputProfile = document.querySelector(".popup__button-close_input-profile");      //кнопка закрыть попап профиля

  buttonCloseInputProfile.addEventListener("click", () => closePopup(popupProfile)) // закрыть редактирование профиля
  

  const profileButtonAdd = document.querySelector(".profile__button-add");        /*кнопка добавления карточки*/

  profileButtonAdd.addEventListener("click", () => { // открыть форму добавления карточки
    cardNameInput.value = "";
    cardPhotoInput.value = "";
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

  

  export { closePopupPlace, openPopupBigImage, closePopup, openPhoto, popupProfile };
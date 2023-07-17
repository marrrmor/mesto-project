import '../pages/index.css';
  
 import { enableValidation } from './validate.js';
 enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

 import { closePopupPlace, openPopupBigImage, closePopup, popupProfile } from './modal.js'

 import { addInitialCards, createCard, placesSet } from './card.js';
 addInitialCards();
  
 import { cardNameInput, cardPhotoInput } from './utils.js';
           

  
   
  const nameInput = document.querySelector(".popup__input_type_name");            /*Инпут имя*/
  const jobInput = document.querySelector(".popup__input_type_description");      /*Инпут профессия*/
  const nameProfile = document.querySelector(".profile__title");                  
  const jobProfile = document.querySelector(".profile__subtitle");
  
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
  
 
  
  export { nameInput, jobInput, nameProfile, jobProfile, handleFormSubmit, handleFormSubmitPlace };
  
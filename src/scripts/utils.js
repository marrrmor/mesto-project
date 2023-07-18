const cardNameInput = document.querySelector(".popup__input_type_card-name");   /*Инпут название места*/
const cardPhotoInput = document.querySelector(".popup__input_type_card-photo"); /*Инпут ссылка на изображение*/

const config = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button-save",
    inactiveButtonClass: "popup__button-save_disabled",
    inputErrorClass: "popup__input_error", 
    popupContainer: ".popup__container",
    textError: "popup__input_text-error"
  }

export { cardNameInput, cardPhotoInput, config };

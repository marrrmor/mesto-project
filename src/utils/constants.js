export const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-27',
  headers: {
    authorization: 'e540c1e9-8b28-4703-a61d-9aea54be84ab',
    'Content-Type': 'application/json',
  },
};

export const userInfoSelectors = {
  nameSelector: '.profile__title',
  aboutSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar',
};

export const formValidatorConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inputErrorClass: 'popup__input_error',
  textErrorClass: 'popup__input_text-error',
};

export const photoPopupConfig = {
  popupSelector: '.popup__big-image',
  imageSelector: '.popup__big-image-photo',
  captionSelector: '.popup__big-image-name',
};

export const cardTemplateId = '#place-template';
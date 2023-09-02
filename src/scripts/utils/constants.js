export const avatarProfile = document.querySelector('.profile__avatar'); // Аватар
export const nameProfile = document.querySelector('.profile__title'); // Имя
export const jobProfile = document.querySelector('.profile__subtitle'); // Деятельность

export const popupEditForm = document.querySelector('.popup__edit-form'); // форма профиля

export const avatarProfileInput = document.querySelector('.popup__input_type_url-avatar'); //Инпут аватар
export const cardNameInput = document.querySelector('.popup__input_type_card-name'); //Инпут название места
export const cardPhotoInput = document.querySelector('.popup__input_type_card-photo'); //Инпут ссылка на изображение
export const nameInput = document.querySelector('.popup__input_type_name'); //Инпут имя
export const jobInput = document.querySelector('.popup__input_type_description'); //Инпут профессия

export const avatarButton = document.querySelector('.profile__button-change-avatar'); //кнопка редактировать аватар
export const profileButtonEdit = document.querySelector('.profile__button-edit'); //кнопка редактировать профиль
export const profileButtonAdd = document.querySelector('.profile__button-add'); //кнопка добавления карточки

export const buttonCloseInputAvatar = document.querySelector('.popup__button-close_avatar'); //кнопка закрыть попап смены аватара
export const buttonCloseInputProfile = document.querySelector('.popup__button-close_input-profile'); //кнопка закрыть попап профиля
export const buttonCloseInputPlace = document.querySelector('.popup__button-close_input-place'); //кнопка закрыть попап места
export const buttonCloseImage = document.querySelector('.popup__button-close_big-image'); //кнопка закрыть попап с фото

export const popupAvatar = document.querySelector('.popup.popup__change-avatar'); //Попап изменения аватара
export const popupProfile = document.querySelector('.popup.popup__input-profile'); //Попап изменения профиля
export const popupPlace = document.querySelector('.popup.popup__input-place'); //Попап добавления карточки

export const numberLike = document.querySelector('.place__number-like');

export const popupBigImage = document.querySelector('.popup.popup__big-image'); //Попап галереи фото
export const namePicturePopup = document.querySelector('.popup__big-image-name');
export const picturePopup = document.querySelector('.popup__big-image-photo');

export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_error',
  popupContainer: '.popup__container',
  textError: 'popup__input_text-error',
};

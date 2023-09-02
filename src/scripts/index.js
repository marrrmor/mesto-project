import '../pages/index.css';
import { toggleButtonState, checkInputValidity, removeValidationErrors } from './validate.js';
import {
  cardNameInput,
  cardPhotoInput,
  popupProfile,
  config,
  buttonCloseImage,
  buttonCloseInputPlace,
  closePopupBigImage,
  profileButtonEdit,
  buttonCloseInputProfile,
  profileButtonAdd,
  popupPlace,
  nameInput,
  avatarProfile,
  nameProfile,
  jobInput,
  jobProfile,
  avatarButton,
  popupAvatar,
  buttonCloseInputAvatar,
  avatarProfileInput,
  renderLoading,
} from './utils.js';
import { openPopup, closePopup } from './modal.js';
import { getUsersInfo, getInitialCards, editProfile, addNewCard, changeAvatar } from './api.js';
import { renderInitialCards, renderNewCard } from './card.js';

let userId = null;

function renderProfile(data) {
  // рендер профиля
  avatarProfile.style.backgroundImage = `url("${data.avatar}")`;
  nameProfile.textContent = data.name;
  jobProfile.textContent = data.about;
}

function renderPage() {
  //рендер страницы
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
    });
}

function findElementsInPopup(popupSelector) {
  const formElement = popupSelector.querySelector('.popup__container');
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button-save');

  return { formElement, inputList, buttonElement };
}

avatarButton.addEventListener('click', () => {
  // открыть редактирование аватара
  const { formElement, inputList, buttonElement } = findElementsInPopup(popupAvatar);

  const [inputElement] = inputList;

  checkInputValidity(formElement, inputElement);

  removeValidationErrors(inputList, formElement, config);

  toggleButtonState(inputList, buttonElement, config);

  openPopup(popupAvatar);
});

function handleFormSubmitAvatar(evt) {
  //функция сохранения аватара
  evt.preventDefault();
  renderLoading(true, popupAvatar);
  changeAvatar({
    avatar: avatarProfileInput.value,
  })
    .then((data) => {
      avatarProfile.style.backgroundImage = `url("${data.avatar}")`;
      avatarProfileInput.value.reset;
      closePopup(popupAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupAvatar);
    });
}

profileButtonEdit.addEventListener('click', () => {
  // открыть редактирование профиля
  const { formElement, inputList, buttonElement } = findElementsInPopup(popupProfile);

  removeValidationErrors(inputList, formElement, config);

  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;

  toggleButtonState(inputList, buttonElement, config);

  openPopup(popupProfile);
});

function handleFormSubmit(evt) {
  // функция сохранения профиля
  evt.preventDefault();
  renderLoading(true, popupProfile);
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
    });
}

profileButtonAdd.addEventListener('click', () => {
  // открыть форму добавления карточки

  const { formElement, inputList, buttonElement } = findElementsInPopup(popupPlace);

  removeValidationErrors(inputList, formElement, config);

  toggleButtonState(inputList, buttonElement, config);

  openPopup(popupPlace);
});

function handleFormSubmitPlace(evt) {
  //функция сохранения в карточки
  evt.preventDefault();
  renderLoading(true, popupPlace);
  addNewCard({
    name: cardNameInput.value,
    link: cardPhotoInput.value,
  })
    .then((data) => {
      renderNewCard(data, userId);
      cardPhotoInput.value.reset;
      cardNameInput.value.reset;
      closePopup(popupPlace);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupPlace);
    });
}

renderPage();

buttonCloseInputProfile.addEventListener('click', () => closePopup(popupProfile)); // закрыть редактирование профиля

buttonCloseInputPlace.addEventListener('click', () => closePopup(popupPlace)); // закрыть форму добавления карточки

buttonCloseImage.addEventListener('click', closePopupBigImage); // закрыть попап с фото

buttonCloseInputAvatar.addEventListener('click', () => closePopup(popupAvatar)); // закрыть попап с аватаром

popupProfile.addEventListener('submit', handleFormSubmit);

popupPlace.addEventListener('submit', handleFormSubmitPlace);

popupAvatar.addEventListener('submit', handleFormSubmitAvatar);

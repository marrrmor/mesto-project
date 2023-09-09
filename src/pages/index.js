import './index.css';

import { Section, PopupWithImage, PopupWithForm } from '../components';
import { Api, UserInfo, FormValidator, Card } from '../components';

import { apiConfig, userInfoSelectors, formValidatorConfig } from '../utils';
import { photoPopupConfig, createCard, cardTemplateId } from '../utils';

let userId = null;

// Api instance
const api = new Api(apiConfig);

// Get data and render page
const userInfo = new UserInfo(userInfoSelectors);
const photoPopup = new PopupWithImage(photoPopupConfig);
const cardsSection = new Section('.places');

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([{ _id, ...userData }, cardsData]) => {
    userId = _id;
    const cards = cardsData.map((cardData) => createCard(cardData, userId, photoPopup, api));
    userInfo.setAllContent(userData);
    cardsSection.renderItems(cards);
  })
  .catch(console.warn);

// Enable validation form
Array.from(document.forms).forEach((form) => {
  const formValidator = new FormValidator(form.getAttribute('name'), formValidatorConfig);
  formValidator.enableValidation();
});

// Avatar form
const avatarForm = new PopupWithForm({
  formName: 'avatar',
  popupSelector: '.popup__change-avatar',
  submitCallback: async ({ url }) => {
    await api
      .patchAvatar({ avatar: url })
      .then(({ avatar }) => {
        userInfo.setAvatar(avatar);
        avatarForm.disableButton({ isDisabled: true });
        avatarForm.closePopup();
      })
      .catch((error) => {
        console.warn(error);
        avatarForm.disableButton({ isDisabled: false });
      });
  },
});

const triggerAvatarForm = document.querySelector('.profile__button-change-avatar');
triggerAvatarForm.addEventListener('click', () => avatarForm.openPopup());

// Profile form
const profilePopup = new PopupWithForm({
  formName: 'profile',
  popupSelector: '.popup__input-profile',
  triggerSelector: '.profile__button-edit',
  openCallback: ({ name: nameInput, description: aboutInput }) => {
    const { name, about } = userInfo.getInfo();
    nameInput.value = name;
    aboutInput.value = about;
  },
  submitCallback: async ({ name, description }) => {
    await api
      .editProfile({ name, about: description })
      .then(() => {
        userInfo.setName(name);
        userInfo.setAbout(description);
        profilePopup.disableButton({ isDisabled: true });
        profilePopup.closePopup();
      })
      .catch((error) => {
        console.warn(error);
        profilePopup.disableButton({ isDisabled: false });
      });
  },
});

const triggerProfilePopup = document.querySelector('.profile__button-edit');
triggerProfilePopup.addEventListener('click', () => profilePopup.openPopup());

// Place form
const placeForm = new PopupWithForm({
  formName: 'place',
  popupSelector: '.popup__input-place',
  submitCallback: async ({ name, link }) => {
    await api
      .addNewCard({ name, link })
      .then((data) => {
        const card = createCard(data, userId, photoPopup, api);
        cardsSection.prependItem(card);
        placeForm.disableButton({ isDisabled: true });
        placeForm.closePopup();
      })
      .catch((error) => {
        console.warn(error);
        placeForm.disableButton({ isDisabled: false });
      });
  },
});

const triggerPlaceForm = document.querySelector('.profile__button-add');
triggerPlaceForm.addEventListener('click', () => placeForm.openPopup());

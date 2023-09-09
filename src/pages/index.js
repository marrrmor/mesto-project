import './index.css';

import { Section, PopupWithImage, PopupWithForm } from '../components';
import { Api, UserInfo, FormValidator, Card } from '../components';

import { photoPopupConfig, formValidatorConfig } from '../utils';
import { apiConfig, userInfoSelectors, userId } from '../utils';

// Api instance
const api = new Api(apiConfig);

// User info
const userInfo = new UserInfo(userInfoSelectors);
api
  .getUserInfo()
  .then((data) => userInfo.setAllContent(data))
  .catch(console.warn);

// Enable validation form
Array.from(document.forms).forEach((form) => {
  new FormValidator(form.getAttribute('name'), formValidatorConfig);
});

// Avatar form
const triggerAvatarForm = document.querySelector('.profile__button-change-avatar');

const avatarForm = new PopupWithForm({
  formName: 'avatar',
  popupSelector: '.popup__change-avatar',
  submitCallback: async ({ url }) => {
    await api
      .patchAvatar({ avatar: url.value })
      .then(({ avatar }) => userInfo.setAvatar(avatar))
      .catch(console.warn);
  },
});

triggerAvatarForm.addEventListener('click', () => avatarForm.openPopup());

// Profile form
const triggerProfilePopup = document.querySelector('.profile__button-edit');

const profilePopup = new PopupWithForm({
  formName: 'profile',
  popupSelector: '.popup__input-profile',
  triggerSelector: '.profile__button-edit',
  openCallback: ({ name, description }) => {
    name.value = userInfo.getName();
    description.value = userInfo.getAbout();
  },
  submitCallback: async ({ name, description }) => {
    await api
      .editProfile({ name: name.value, about: description.value })
      .then(() => {
        userInfo.setName(name.value);
        userInfo.setAbout(description.value);
      })
      .catch(console.warn);
  },
});

triggerProfilePopup.addEventListener('click', () => profilePopup.openPopup());

// Cards
const photoPopup = new PopupWithImage(photoPopupConfig);
const cardsSection = new Section('.places');

api
  .getInitialCards()
  .then((response) => {
    const cards = response.map((data) => {
      return new Card({
        data,
        userId,
        onClickPhoto: ({ name, link }) => photoPopup.openPopup({ name, link }),
        onDeleteCard: async ({ _id }) => await api.deleteCard(_id).catch(console.warn),
        onAddLike: async ({ _id }) => await api.putLike(_id).catch(console.warn),
        onDeleteLike: async ({ _id }) => await api.deleteLike(_id).catch(console.warn),
      });
    });

    cardsSection.renderItems(cards);
  })
  .catch(console.warn);

// Place form
const triggerPlaceForm = document.querySelector('.profile__button-add');

const placeForm = new PopupWithForm({
  formName: 'place',
  popupSelector: '.popup__input-place',
  submitCallback: async ({ name, photo }) => {
    await api
      .addNewCard({ name: name.value, link: photo.value })
      .then((data) => {
        const card = new Card({
          data,
          userId,
          onClickPhoto: ({ name, link }) => photoPopup.openPopup({ name, link }),
          onDeleteCard: async ({ _id }) => await api.deleteCard(_id).catch(console.warn),
          onAddLike: async ({ _id }) => await api.putLike(_id).catch(console.warn),
          onDeleteLike: async ({ _id }) => await api.deleteLike(_id).catch(console.warn),
        });

        cardsSection.prependItem(card);
      })
      .catch(console.warn);
  },
});

triggerPlaceForm.addEventListener('click', () => placeForm.openPopup());

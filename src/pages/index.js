import './index.css';

import { renderInitialCards, renderNewCard } from '../scripts/card.js';
import { Form, Profile } from '../scripts/components';
import { api } from '../scripts/api';

let userId = null;

// Profile
const profile = new Profile('.profile__title', '.profile__subtitle', '.profile__avatar');

// render page
Promise.all([api.getUsersInfo(), api.getInitialCards()])
  .then((data) => {
    const [profileData, cardsInitialData] = data;
    userId = profileData._id;
    profile.setData(profileData);
    renderInitialCards(cardsInitialData, userId);
  })
  .catch(console.warn);

// Avatar
const formAvatar = new Form('.popup__change-avatar', '.profile__button-change-avatar');

formAvatar.setCallbackOnSubmit(async () => {
  const { url } = formAvatar.formEl.elements;
  await api
    .changeAvatar({ avatar: url.value })
    .then(({ avatar }) => profile.setData({ avatar }))
    .catch(console.warn);
});

// Profile
const formProfile = new Form('.popup__input-profile', '.profile__button-edit');

formProfile.setCallbackOnOpen(() => {
  const { name, description } = formProfile.formEl.elements;
  name.value = profile.name;
  description.value = profile.description;
});

formProfile.setCallbackOnSubmit(async () => {
  const { name, description } = formProfile.formEl.elements;
  await api
    .editProfile({ name: name.value, about: description.value })
    .then(() => profile.setData({ name: name.value, about: description.value }))
    .catch(console.warn);
});

// Place
const formPlace = new Form('.popup__input-place', '.profile__button-add');

formPlace.setCallbackOnSubmit(async () => {
  const { name, photo } = formPlace.formEl.elements;
  await api
    .addNewCard({ name: name.value, link: photo.value })
    .then((data) => renderNewCard(data, userId))
    .catch(console.warn);
});

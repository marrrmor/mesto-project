import './index.css';

import Section from '../scripts/components/Section';
import Profile from '../scripts/components/UserInfo';
import Popup from '../scripts/components/Popup';
import Form from '../scripts/components/FormValidator';
import Card from '../scripts/components/Card';
import { api } from '../scripts/components/Api';

let userId = null;

// Profile
const profile = new Profile('.profile__title', '.profile__subtitle', '.profile__avatar');

await api
  .getUsersInfo()
  .then(({ _id, name, about, avatar }) => {
    userId = _id;
    profile.setData({ name, about, avatar });
  })
  .catch(console.warn);

// Cards
const cardsSection = new Section('.places');
const photoPopup = new Popup('.popup__big-image');

api
  .getInitialCards()
  .then((data) => {
    const cards = data.map((cardData) => new Card(cardData, userId, photoPopup));
    cardsSection.renderItems(cards);
  })
  .catch(console.warn);

// Avatar form
const formAvatar = new Form('.popup__change-avatar', '.profile__button-change-avatar');

formAvatar.setCallbackOnSubmit(async () => {
  const { url } = formAvatar.formEl.elements;
  await api
    .changeAvatar({ avatar: url.value })
    .then(({ avatar }) => profile.setData({ avatar }))
    .catch(console.warn);
});

// Profile form
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

// Place form
const formPlace = new Form('.popup__input-place', '.profile__button-add');

formPlace.setCallbackOnSubmit(async () => {
  const { name, photo } = formPlace.formEl.elements;
  await api
    .addNewCard({ name: name.value, link: photo.value })
    .then((data) => {
      const card = new Card(data, userId, photoPopup);
      cardsSection.prependItem(card);
    })
    .catch(console.warn);
});

import './index.css';

import { avatarProfile, nameProfile, jobProfile } from '../scripts/utils';
import { renderInitialCards, renderNewCard } from '../scripts/card.js';
import { Form } from '../scripts/components';
import { api } from '../scripts/api';

let userId = null;

// Avatar
const formAvatar = new Form('.popup__change-avatar', '.profile__button-change-avatar');

formAvatar.setCallbackOnSubmit(async () => {
  const { url } = formAvatar.formEl.elements;
  await api
    .changeAvatar({ avatar: url.value })
    .then(() => {
      avatarProfile.style.backgroundImage = `url('${url.value}')`;
    })
    .catch(console.warn);
});

// Profile
const formProfile = new Form('.popup__input-profile', '.profile__button-edit');

formProfile.setCallbackOnOpen(() => {
  const { name, description } = formProfile.formEl.elements;
  name.value = nameProfile.textContent;
  description.value = jobProfile.textContent;
});

formProfile.setCallbackOnSubmit(async () => {
  const { name, description } = formProfile.formEl.elements;
  await api
    .editProfile({ name: name.value, about: description.value })
    .then(() => {
      nameProfile.textContent = name.value;
      jobProfile.textContent = description.value;
    })
    .catch(console.warn);
});

// Place
const formPlace = new Form('.popup__input-place', '.profile__button-add');

formPlace.setCallbackOnSubmit(async () => {
  const { name, photo } = formPlace.formEl.elements;
  await api
    .addNewCard({ name: name.value, link: photo.value })
    .then((data) => {
      renderNewCard(data, userId);
    })
    .catch(console.warn);
});

/** @todo in refactoring */
function renderProfile(data) {
  // рендер профиля
  avatarProfile.style.backgroundImage = `url("${data.avatar}")`;
  nameProfile.textContent = data.name;
  jobProfile.textContent = data.about;
}

function renderPage() {
  //рендер страницы
  const profile = api.getUsersInfo();
  const cardsInitial = api.getInitialCards();
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

renderPage();

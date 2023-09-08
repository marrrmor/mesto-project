import './index.css';

import { apiConfig, userInfoSelectors, formValidatorConfig } from '../utils';
import { Api, UserInfo, PopupWithForm, FormValidator } from '../components';

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
new PopupWithForm({
  formName: 'avatar',
  popupSelector: '.popup__change-avatar',
  triggerSelector: '.profile__button-change-avatar',
  submitCallback: async ({ url }) => {
    await api
      .patchAvatar({ avatar: url.value })
      .then(({ avatar }) => userInfo.setAvatar(avatar))
      .catch(console.warn);
  },
});

// Profile form
new PopupWithForm({
  formName: 'profile',
  popupSelector: '.popup__input-profile',
  triggerSelector: '.profile__button-edit',
  openCallback: () => {
    const { name, description } = document.forms['profile'];
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

// Place form
new PopupWithForm({
  formName: 'place',
  popupSelector: '.popup__input-place',
  triggerSelector: '.profile__button-add',
  submitCallback: async ({ name, photo }) => {
    await api
      .addNewCard({ name: name.value, link: photo.value })
      .then((data) => {
        console.log(data);
      })
      .catch(console.warn);
  },
});

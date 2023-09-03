import { picturePopup, namePicturePopup } from './utils';
import { Popup } from './components';
import { api } from './api';

export const placesSet = document.querySelector('.places'); //Фотогалерея
const placeTemplate = document.querySelector('#place-template').content; //Макет карточки
const photoPopup = new Popup('.popup__big-image');

export function createCard(data, userId) {
  const cardElement = placeTemplate.querySelector('.place').cloneNode(true); // клонирование элементов
  const itemCard = cardElement.querySelector('.place__photo');
  const likeButton = cardElement.querySelector('.place__button-like');
  const likesCountElement = cardElement.querySelector('.place__count-likes');
  const deleteButton = cardElement.querySelector('.place__button-delete');

  itemCard.src = data.link;
  itemCard.alt = data.name + ' фотография';
  cardElement.querySelector('.place__name').textContent = data.name;
  likesCountElement.textContent = data.likes.length;

  cardElement.setAttribute('data-id', data._id);

  if (data.owner._id === userId) {
    //кнопка удалить только на своих карточках
    deleteButton.classList.add('place__button-delete_active');
    deleteButton.addEventListener('click', handleDeleteButtonClick);
  } else {
    deleteButton.classList.remove('place__button-delete_active');
  }

  let liked = data.likes.some((like) => like._id === userId); // Проверка лайка от текущего пользователя

  if (liked) {
    likeButton.classList.add('place__button-like_active');
  } else {
    likeButton.classList.remove('place__button-like_active');
  }

  likeButton.addEventListener('click', () => {
    //Поставить/удалить лайк
    if (liked) {
      api
        .deleteLike(data._id)
        .then(() => {
          data.likes = data.likes.filter((like) => like._id !== userId);
          liked = false;
          likeButton.classList.remove('place__button-like_active');
          likesCountElement.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .putLike(data._id)
        .then(() => {
          data.likes.push(data.owner);
          liked = true;
          likeButton.classList.add('place__button-like_active');
          likesCountElement.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  itemCard.addEventListener('click', handleItemClick);

  return cardElement;
}

export function renderInitialCards(cardsData, userId) {
  // рендер карточек
  cardsData.forEach((data) => {
    const card = createCard(data, userId);
    placesSet.append(card);
  });
}

export function renderNewCard(data, userId) {
  // добавить новую карточку
  const card = createCard(data, userId);
  placesSet.prepend(card);
}

function handleItemClick(evt) {
  openPhoto(evt);
}

function getCardId(evt) {
  //получить id карточки
  const targetCard = evt.target.closest('.place');
  return targetCard.dataset.id;
}

function handleDeleteButtonClick(evt) {
  // удаление карточки
  const cardId = getCardId(evt);
  api
    .deleteCard(cardId)
    .then(() => {
      evt.target.closest('.place').remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

export function openPhoto(evt) {
  const photoCard = evt.target.closest('.place');
  const photoImage = photoCard.querySelector('.place__photo');
  const photoName = photoCard.querySelector('.place__name');

  photoPopup.openPopup();

  picturePopup.src = photoImage.src;
  picturePopup.alt = photoImage.alt;
  namePicturePopup.textContent = photoName.textContent;
}

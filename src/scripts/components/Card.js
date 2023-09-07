export class Card {
  constructor(data, userId, cardSelector) {
    this._cardName = data.name;
    this._cardLink = data.link;
    this._cardLikes = data.likes;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._userId = userId;
    this._cardSelector = cardSelector;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.place')
      .cloneNode(true); // клонирование элементов

    return cardElement;
  }

  //кнопка удалить только на своих карточках
  _addDeleteButton() {
    if (this._ownerId === this._userId) {
      this._deleteButton.add('place__button-delete_active');
    } else {
      this._deleteButton.classList.remove('place__button-delete_active');
    }
  }

  //Переключение кнопки лайк
  _toggleLikeButton(data) {
    this._liked = this._data.likes.some((like) => like._id === userId); // Проверка лайка от текущего пользователя
    if (this._liked) {
      likeButton.classList.add('place__button-like_active');
    } else {
      likeButton.classList.remove('place__button-like_active');
    }
  }

  //Поставить/удалить лайк
  _toggleLikeCounter() {}

  /* if (liked) {
        .deleteLike(this._data._id)
        .then(() => {
          this._data.likes = this._data.likes.filter((like) => like._id !== userId);
          liked = false;
          likeButton.classList.remove('place__button-like_active');
          likesCountElement.textContent = this._data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {

        .putLike(this._data._id)
        .then(() => {
          this._data.likes.push(this._data.owner);
          liked = true;
          likeButton.classList.add('place__button-like_active');
          likesCountElement.textContent = this._data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  /*
  //_setEventListeners() {
  //  this._element;   deleteButton.addEventListener('click', handleDeleteButtonClick);
  this.likeButton.addEventListener('click', () => {
    this.toggleLike(this.data, this.cardElement);
  //}

  */

  generate() {
    this._element = this._getElement();
    this._placeImage = this._element.querySelector('.place__photo');
    this._placeName = this._element.querySelector('.place__name');
    this._likesCountElement = this._element.querySelector('.place__count-likes');
    this._likeButton = this._element.querySelector('.place__button-like');
    this._deleteButton = this._element.querySelector('.place__button-delete');

    this._placeName.textContent = this._cardName;
    this._placeImage.src = this._cardLink;
    this._placeImage.alt = this._cardName + ' фотография';
    this._likesCountElement.textContent = this.__cardLikes.length;

    return this._element;
  }
}

//cardElement.setAttribute('data-id', this._data._id);

/*this.deleteButton.addEventListener('click', () => {
      this.handleDeleteButtonClick(this.data, this.cardElement);
    });

    this.itemCard.addEventListener('click', () => {
      this.handleItemClick(this.data, this.cardElement);
    });*/

/*
export function renderInitialCards(data) {
  const newCard = new Card({ data }, selector).createCard();
  api.getInitialCards().then((allCards) =>
    allCards.forEach(function (item) {
      const card = new Card(item);
      //const cardElement = card.generate();

      document.querySelector('.places').append(cardElement);
    }),
  );
}*/

export function renderInitialCards(cardsData, userId) {
  api.getInitialCards().then((allCards) =>
    allCards.forEach(function (item) {
      const card = new Card(item);
      const cardElement = card.generate();

      document.querySelector('.places').append(cardElement);
    }),
  );
}
// рендер карточек
//   cardsData.forEach((data) => {
//     const card = createCard(data, userId);
//     placesSet.append(card);
//   });

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

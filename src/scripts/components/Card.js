import { api } from './Api';

export default class Card {
  constructor(data, userId, photoPopup, { handlePlacePhotoClick }) {
    const template = document.querySelector('#place-template').content;

    this._data = data;
    this._userId = userId;

    this._isMyCard = data.owner._id === this._userId;
    this._likes = data.likes;
    this._isLiked = this._getIsLike(data.likes);

    this._popup = photoPopup;
    this._popupImage = photoPopup.popupEl.querySelector('.popup__big-image-photo');
    this._popupTitle = photoPopup.popupEl.querySelector('.popup__big-image-name');

    this._cardEl = template.querySelector('.place').cloneNode(true);

    this._titleEl = this._cardEl.querySelector('.place__name');
    this._placePhotoEl = this._cardEl.querySelector('.place__photo');
    this._deleteButton = this._cardEl.querySelector('.place__button-delete');
    this._likeButton = this._cardEl.querySelector('.place__button-like');
    this._likeCounterEl = this._cardEl.querySelector('.place__count-likes');
    this._handlePlacePhotoClick = handlePlacePhotoClick;

    this._setTitle();
    this._setPlacePhoto();
    this._setDeleteButton();
    this._setLikeButton();
    this._setLikeCounter();
    this._setCardEventListeners();

    return this._cardEl;
  }

  _getIsLike(likes) {
    return likes.some((like) => like._id === this._userId);
  }

  _setTitle() {
    this._titleEl.textContent = this._data.name;
  }

  _setPlacePhoto() {
    this._placePhotoEl.src = this._data.link;
    this._placePhotoEl.alt = this._data.name;
  }

  _setDeleteButton() {
    if (!this._isMyCard) {
      this._deleteButton.remove();
      this._deleteButton = null;
    }
  }

  _setLikeButton() {
    if (this._isLiked) {
      this._likeButton.classList.add('place__button-like_active');
    } else {
      this._likeButton.classList.remove('place__button-like_active');
    }
  }

  _setLikeCounter() {
    this._likeCounterEl.textContent = this._likes.length;
  }

  _setCardEventListeners() {
    this._placePhotoEl.addEventListener('click', () => {
      this._handlePlacePhotoClick(this._data);
    });
    this._likeButton.addEventListener('click', this._handleLikeButtonClick);

    if (this._deleteButton) {
      this._deleteButton.addEventListener('click', this._handleDeleteButtonClick);
    }
  }

  _removeCardEventListeners() {
    this._placePhotoEl.removeEventListener('click', this._handlePlacePhotoClick);
    this._likeButton.addEventListener('click', this._handleLikeButtonClick);

    if (this._deleteButton) {
      this._deleteButton.removeEventListener('click', this._handleDeleteButtonClick);
    }
  }

  /*_handlePlacePhotoClick = () => {
    this._popupImage.src = this._data.link;
    this._popupImage.alt = this._data.name;
    this._popupTitle.textContent = this._data.name;
    this._popup.openPopup();
  };*/

  _handleDeleteButtonClick = () => {
    this._deleteButton.disabled = true;
    api
      .deleteCard(this._data._id)
      .then(() => {
        this._removeCardEventListeners();
        this._cardEl.remove();
      })
      .catch((error) => {
        this._deleteButton.disabled = false;
        console.warn(error);
      });
  };

  _handleLikeButtonClick = () => {
    this._likeButton.disabled = true;

    if (this._isLiked) {
      api
        .deleteLike(this._data._id)
        .then((data) => {
          this._likes = data.likes;
          this._isLiked = this._getIsLike(data.likes);
          this._setLikeCounter();
          this._setLikeButton();
          this._likeButton.disabled = false;
        })
        .catch((error) => {
          this._likeButton.disabled = false;
          console.warn(error);
        });
    } else {
      api
        .putLike(this._data._id)
        .then((data) => {
          this._likes = data.likes;
          this._isLiked = this._getIsLike(data.likes);
          this._setLikeCounter();
          this._setLikeButton();
          this._likeButton.disabled = false;
        })
        .catch((error) => {
          this._likeButton.disabled = false;
          console.warn(error);
        });
    }
  };
}

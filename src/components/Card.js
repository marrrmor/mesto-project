export class Card {
  constructor({ data, templateId, userId, onClickPhoto, onDeleteCard, onAddLike, onDeleteLike }) {
    const template = document.querySelector(templateId).content;

    this._data = data;
    this._userId = userId;

    this._isMyCard = data.owner._id === this._userId;
    this._likes = data.likes;
    this._isLiked = this._getIsLike(data.likes);

    this._cardEl = template.querySelector('.place').cloneNode(true);

    this._titleEl = this._cardEl.querySelector('.place__name');
    this._placePhotoEl = this._cardEl.querySelector('.place__photo');
    this._deleteButton = this._cardEl.querySelector('.place__button-delete');
    this._likeButton = this._cardEl.querySelector('.place__button-like');
    this._likeCounterEl = this._cardEl.querySelector('.place__count-likes');

    this._onClickPhoto = onClickPhoto;
    this._onDeleteCard = onDeleteCard;
    this._onAddLike = onAddLike;
    this._onDeleteLike = onDeleteLike;
  }

  generate() {
    this._titleEl.textContent = this._data.name;

    this._placePhotoEl.src = this._data.link;
    this._placePhotoEl.alt = this._data.name;

    if (!this._isMyCard) {
      this._deleteButton.remove();
      this._deleteButton = null;
    }

    this._setLikeButton();
    this._setLikeCounter();
    this._setCardEventListeners();
    return this._cardEl;
  }

  _getIsLike(likes) {
    return likes.some((like) => like._id === this._userId);
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
    this._placePhotoEl.addEventListener('click', this._handlePlacePhotoClick);
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

  _handlePlacePhotoClick = () => {
    this._onClickPhoto(this._data);
  };

  _handleDeleteButtonClick = () => {
    this._deleteButton.disabled = true;

    this._onDeleteCard(this._data)
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
      this._onDeleteLike(this._data)
        .then(({ likes }) => this._onLike({ likes }))
        .catch(() => {
          console.warn(error);
          this._likeButton.disabled = false;
        });
    } else {
      this._onAddLike(this._data)
        .then(({ likes }) => this._onLike({ likes }))
        .catch(() => {
          console.warn(error);
          this._likeButton.disabled = false;
        });
    }
  };

  _onLike({ likes }) {
    this._likes = likes;
    this._isLiked = this._getIsLike(likes);
    this._setLikeCounter();
    this._setLikeButton();
    this._likeButton.disabled = false;
  }
}

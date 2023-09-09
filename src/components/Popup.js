export class Popup {
  constructor({ popupSelector }) {
    this._popupEl = document.querySelector(popupSelector);
    this._closeButton = this._popupEl.querySelector('.popup__button-close');
    this._setPopupEventListeners();
  }

  openPopup() {
    this._popupEl.classList.add('popup_opened');
    document.addEventListener('keydown', this._closeByEsc);
  }

  closePopup() {
    this._popupEl.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closeByEsc);
  }

  _closeByEsc = ({ key }) => {
    if (key !== 'Escape') return;
    this.closePopup();
  };

  _closeByUser = ({ target }) => {
    if (target.classList.contains('popup') || target.classList.contains('popup__button-close')) {
      this.closePopup();
    }
  };

  _setPopupEventListeners() {
    this._popupEl.addEventListener('click', this._closeByUser);
  }
}

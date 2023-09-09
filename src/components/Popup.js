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

  _closeByOverlay = ({ target }) => {
    if (target !== this._popupEl) return;
    this.closePopup();
  };

  _setPopupEventListeners() {
    this._closeButton.addEventListener('click', () => this.closePopup());
    this._popupEl.addEventListener('click', this._closeByOverlay);
  }
}

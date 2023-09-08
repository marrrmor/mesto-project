export class Popup {
  constructor(popupSelector, triggerSelector) {
    this.popupEl = document.querySelector(popupSelector);
    this._triggerEl = triggerSelector && document.querySelector(triggerSelector);
    this._closeButton = this.popupEl.querySelector('.popup__button-close');
    this._setPopupEventListenters();
  }

  openPopup() {
    this.popupEl.classList.add('popup_opened');
    document.addEventListener('keydown', this._closeByEsc);
  }

  closePopup() {
    document.removeEventListener('keydown', this._closeByEsc);
    this.popupEl.classList.remove('popup_opened');
  }

  _closeByEsc = ({ key }) => {
    if (key !== 'Escape') return;
    this.closePopup();
  };

  _closeByOverlay(target) {
    if (target !== this.popupEl) return;
    this.closePopup();
  }

  _setPopupEventListenters() {
    this._triggerEl && this._triggerEl.addEventListener('click', () => this.openPopup());
    this._closeButton.addEventListener('click', () => this.closePopup());
    this.popupEl.addEventListener('click', ({ target }) => this._closeByOverlay(target));
  }
}

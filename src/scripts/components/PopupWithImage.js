import Popup from './Popup';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, triggerSelector) {
    super(popupSelector, triggerSelector);
    this._popupImage = this.popupEl.querySelector('.popup__big-image-photo');
    this._popupTitle = this.popupEl.querySelector('.popup__big-image-name');
  }

  openPopup(data) {
    this._popupImage.src = data.link;
    this._popupImage.alt = data.name;
    this._popupTitle.textContent = data.name;
    super.openPopup();
  }
}

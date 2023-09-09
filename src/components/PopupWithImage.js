import { Popup } from './Popup';

export class PopupWithImage extends Popup {
  constructor({ popupSelector, imageSelector, captionSelector }) {
    super({ popupSelector });

    this._imageEl = this._popupEl.querySelector(imageSelector);
    this._captionEl = this._popupEl.querySelector(captionSelector);
  }

  openPopup({ name, link }) {
    this._imageEl.src = link;
    this._imageEl.alt = name;
    this._captionEl = name;
    super.openPopup();
  }
}

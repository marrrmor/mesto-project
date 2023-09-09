import { Popup } from './Popup';

export class PopupWithForm extends Popup {
  constructor({ formName, popupSelector, submitCallback, openCallback }) {
    super({ popupSelector });

    this._formEl = document.forms[formName];
    this._inputList = Array.from(this._formEl.querySelectorAll('.popup__input'));
    this._submitButton = this._formEl.querySelector('button[type="submit"]');

    this._submitCallback = submitCallback;
    this._openCallback = openCallback;

    this._setFormEventListenters();
  }

  openPopup() {
    super.openPopup();
    if (this._openCallback) this._openCallback(this._formEl);
  }

  closePopup() {
    super.closePopup();
    this._formEl.reset();
  }

  _getInputValues() {
    return this._inputList.reduce((obj, { name, value }) => {
      obj[name] = value;
      return obj;
    }, {});
  }

  disableButton({ isDisabled, isFetching = false }) {
    this._submitButton.disabled = isDisabled;

    if (isFetching) {
      this._submitButton.textContent = this._submitButton.dataset.fetchingText;
    } else {
      this._submitButton.textContent = this._submitButton.dataset.defaultText;
    }
  }

  _setFormEventListenters() {
    this._formEl.addEventListener('submit', (event) => {
      event.preventDefault();
      this.disableButton({ isDisabled: true, isFetching: true });
      this._submitCallback(this._getInputValues());
    });
  }
}

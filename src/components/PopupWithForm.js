import { Popup } from './Popup';

export class PopupWithForm extends Popup {
  constructor({ formName, popupSelector, submitCallback, openCallback }) {
    super({ popupSelector });

    this._formEl = document.forms[formName];
    this._submitButton = this._formEl.querySelector('button[type="submit"]');

    this._submitCallback = submitCallback;
    this._openCallback = openCallback;

    this._setFormEventListenters();
  }

  openPopup() {
    super.openPopup();
    if (this._openCallback) this._openCallback(this._formEl);
  }

  _onSubmit(event) {
    event.preventDefault();
    this._disableButton({ isDisabled: true, isFetching: true });

    Promise.resolve(this._submitCallback(this._formEl))
      .then(() => {
        this._disableButton({ isDisabled: true });
        this.closePopup();
        this._formEl.reset();
      })
      .catch((error) => {
        this._disableButton({ isDisabled: false });
        console.warn(error);
      });
  }

  _disableButton({ isDisabled, isFetching = false }) {
    this._submitButton.disabled = isDisabled;

    if (isFetching) {
      this._submitButton.textContent = this._submitButton.dataset.fetchingText;
    } else {
      this._submitButton.textContent = this._submitButton.dataset.defaultText;
    }
  }

  _setFormEventListenters() {
    this._formEl.addEventListener('submit', (event) => this._onSubmit(event));
  }
}

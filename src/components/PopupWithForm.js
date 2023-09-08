import { Popup } from './Popup';

export class PopupWithForm extends Popup {
  constructor({ formName, popupSelector, triggerSelector, submitCallback, openCallback }) {
    super({ popupSelector, triggerSelector, openCallback });

    this._formEl = document.forms[formName];
    this._submitCallback = submitCallback;
    this._submitButton = this._formEl.querySelector('button[type="submit"]');

    this._setFormEventListenters();
  }

  _onSubmit = (event) => {
    event.preventDefault();
    this._disableButton({ isDisabled: true, isFetching: true });

    Promise.resolve(this._submitCallback(this._formEl)).finally(() => {
      this._disableButton({ isDisabled: true });
      this.closePopup();
      this._formEl.reset();
    });
  };

  _disableButton({ isDisabled, isFetching = false }) {
    this._submitButton.disabled = isDisabled;

    if (isFetching) {
      this._submitButton.textContent = this._submitButton.dataset.fetchingText;
    } else {
      this._submitButton.textContent = this._submitButton.dataset.defaultText;
    }
  }

  _setFormEventListenters() {
    this._formEl.addEventListener('submit', this._onSubmit);
  }
}

// https://i.pinimg.com/originals/bf/89/2e/bf892e298fdfaa1c750b687eb25a0ec6.jpg

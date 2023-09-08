import { Popup } from './Popup';

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_error',
  popupContainer: '.popup__container',
  textError: 'popup__input_text-error',
};

export class Form extends Popup {
  constructor(popupSelector, triggerSelector) {
    super(popupSelector, triggerSelector);

    this.formEl = this.popupEl.querySelector(config.popupContainer);
    this._submitButton = this.formEl.querySelector(config.submitButtonSelector);
    this._inputList = Array.from(this.formEl.querySelectorAll(config.inputSelector));

    this._setFormEventListenters();
  }

  setCallbackOnOpen(callbackFn) {
    this._callbackOnOpen = callbackFn;
  }

  setCallbackOnSubmit(callbackFn) {
    this._callbackOnSubmit = callbackFn;
  }

  openPopup() {
    super.openPopup();
    if (this._callbackOnOpen) this._callbackOnOpen();
    this._disableButton({ isDisabled: true });
  }

  _onSubmit(event) {
    event.preventDefault();
    this._disableButton({ isDisabled: true, isFetching: true });

    if (this._callbackOnSubmit) {
      Promise.resolve(this._callbackOnSubmit()).finally(() => {
        this._disableButton({ isDisabled: false });
        this.closePopup();
        this.formEl.reset();
      });
    }
  }

  _setFormEventListenters() {
    this.formEl.addEventListener('submit', (event) => this._onSubmit(event));

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorPattern);
    } else {
      inputElement.setCustomValidity('');
    }

    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.textError);
  }

  _hideInputError(inputElement) {
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.textError);
    errorElement.textContent = '';
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton({ isDisabled: true });
    } else {
      this._disableButton({ isDisabled: false });
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _disableButton({ isDisabled, isFetching = false }) {
    this._submitButton.disabled = isDisabled;

    if (isDisabled) {
      this._submitButton.classList.add(config.inactiveButtonClass);
    } else {
      this._submitButton.classList.remove(config.inactiveButtonClass);
    }

    if (isFetching) {
      this._submitButton.textContent = this._submitButton.dataset.fetchingText;
    } else {
      this._submitButton.textContent = this._submitButton.dataset.defaultText;
    }
  }
}

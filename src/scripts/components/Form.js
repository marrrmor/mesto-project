import { Popup } from './Popup';
import { formConfig } from '../utils';

export class Form extends Popup {
  constructor(triggerSelector, popupSelector) {
    super(triggerSelector, popupSelector);

    this.formEl = this._popupEl.querySelector(formConfig.popupContainer);
    this._submitButton = this.formEl.querySelector(formConfig.submitButtonSelector);
    this._inputList = Array.from(this.formEl.querySelectorAll(formConfig.inputSelector));

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
    inputElement.classList.add(formConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(formConfig.textError);
  }

  _hideInputError(inputElement) {
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.remove(formConfig.inputErrorClass);
    errorElement.classList.remove(formConfig.textError);
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
      this._submitButton.classList.add(formConfig.inactiveButtonClass);
    } else {
      this._submitButton.classList.remove(formConfig.inactiveButtonClass);
    }

    if (isFetching) {
      this._submitButton.textContent = this._submitButton.dataset.fetchingText;
    } else {
      this._submitButton.textContent = this._submitButton.dataset.defaultText;
    }
  }
}

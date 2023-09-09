export class FormValidator {
  constructor(formName, config) {
    this._formEl = document.forms[formName];
    this._submitButton = this._formEl.querySelector(config.submitButtonSelector);
    this._inputList = Array.from(this._formEl.querySelectorAll(config.inputSelector));

    this._inputErrorClass = config.inputErrorClass;
    this._textErrorClass = config.textErrorClass;

    this._callbackOnSubmit = null;
  }

  enableValidation() {
    this._toggleButtonState();
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
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._textErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._textErrorClass);
    errorElement.textContent = '';
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.disabled = true;
    } else {
      this._submitButton.disabled = false;
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }
}

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input_text-error");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_error");
  errorElement.classList.remove("popup__input_text-error");
  errorElement.textContent = "";
};


const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.valueMissing) {
    inputElement.setCustomValidity("Вы пропустили это поле.");
  } else if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity("Введите данные, используя латинские или кириллические буквы.");
  } else if (inputElement.validity.typeMismatch) {
      inputElement.setCustomValidity("Введите адрес сайта.");
  } else {
  inputElement.setCustomValidity("");
  }


  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};


const toggleButtonState = (inputList, buttonElement) => {
  //hasInvalidInput(inputList);
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__button-save_disabled");
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove("popup__button-save_disabled");
    buttonElement.removeAttribute("disabled"); 
  }
};


const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button-save");
  toggleButtonState(inputList, buttonElement);
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__container"));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(formElement.querySelectorAll(".popup__form"));
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet);
    }); 
  });
};
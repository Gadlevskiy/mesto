// const showInputError = (formElement, inputElement, errorMessage) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add('popup__input_type_error');
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add('popup__input-error_active');
// };

// const hideInputError = (formElement, inputElement) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove('popup__input_type_error');
//   errorElement.classList.remove('popup__input-error_active');
//   errorElement.textContent = '';
// };

// const checkInputValidity = (formElement, inputElement) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage);
//   } else {
//     hideInputError(formElement, inputElement);
//   }
// };

// const setEventListeners = (formElement) => {
//   const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
//   const buttonSubmit = formElement.querySelector('button[type="submit"]');
//   toggleButtonState(inputList, buttonSubmit);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', () => {
//       checkInputValidity(formElement, inputElement);
//       toggleButtonState(inputList, buttonSubmit);
//     });
//   });
// };

// const enableValidation = () => {
//   const formList = Array.from(document.querySelectorAll('.popup__form'));
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//     });
//     setEventListeners(formElement);
//   });
// };

// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// };

// const disableCreateButton = (buttonSubmit) => {
//   buttonSubmit.setAttribute('disabled', true);
//   buttonSubmit.classList.add('popup__btn-add-profile_disabled');
// };

// const activateCreateButton = (buttonSubmit) => {
//   buttonSubmit.removeAttribute('disabled');
//   buttonSubmit.classList.remove('popup__btn-add-profile_disabled');
// };

// const toggleButtonState = (inputList, buttonSubmit) => {
//   if (hasInvalidInput(inputList)) {
//     disableCreateButton(buttonSubmit);
//   } else {
//     activateCreateButton(buttonSubmit);
//   }
// };

// enableValidation();

export class FormValidator {
  constructor(data, formSelector) {
    this._inputSelector = data.inputSelector;
    this._btnAddDisableModify = data.btnAddDisableModify;
    this._inputTypeErrModify = data.inputTypeErrModify;
    this._inputErrActiveModify = data.inputErrActiveModify;
    this._formSelector = formSelector;
  }

  enableValidation() {
    const currentForm = this._formSelector;
    currentForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });
    this._setEventListeners(currentForm);
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputTypeErrModify);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._inputErrActiveModify);
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputTypeErrModify);
    errorElement.classList.remove(this._inputErrActiveModify);
    errorElement.textContent = '';
  }

  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonSubmit = formElement.querySelector('button[type="submit"]');
    this._toggleButtonState(inputList, buttonSubmit);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonSubmit);
      });
    });
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  disableCreateButton(buttonSubmit) {
    buttonSubmit.setAttribute('disabled', true);
    buttonSubmit.classList.add(this._btnAddDisableModify);
  }

  activateCreateButton(buttonSubmit) {
    buttonSubmit.removeAttribute('disabled');
    buttonSubmit.classList.remove(this._btnAddDisableModify);
  }

  _toggleButtonState(inputList, buttonSubmit) {
    if (this._hasInvalidInput(inputList)) {
      this.disableCreateButton(buttonSubmit);
    } else {
      this.activateCreateButton(buttonSubmit);
    }
  }
}

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

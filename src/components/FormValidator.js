export class FormValidator {
  constructor(data, formSelector) {
    this._form = formSelector;
    this._inputSelector = data.inputSelector;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._btnAddDisableModify = data.btnAddDisableModify;
    this._inputTypeErrModify = data.inputTypeErrModify;
    this._inputErrActiveModify = data.inputErrActiveModify;
    this._submitButton = this._form.querySelector(data.buttonSubmit);
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });
    this._toggleButtonState();
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputTypeErrModify);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._inputErrActiveModify);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputTypeErrModify);
    errorElement.classList.remove(this._inputErrActiveModify);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _disableCreateButton() {
    this._submitButton.setAttribute('disabled', true);
    this._submitButton.classList.add(this._btnAddDisableModify);
  }

  _activateCreateButton() {
    this._submitButton.removeAttribute('disabled');
    this._submitButton.classList.remove(this._btnAddDisableModify);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableCreateButton();
    } else {
      this._activateCreateButton();
    }
  }
}

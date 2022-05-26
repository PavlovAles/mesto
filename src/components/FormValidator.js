export default class FormValidator {
  constructor(selectors, form) {
    this._form = form;
    this._fieldsetList = Array.from(this._form.querySelectorAll(selectors.fieldsetSelector));
    this._inputList = Array.from(this._form.querySelectorAll(selectors.inputSelector));
    this._button = this._form.querySelector(selectors.submitButtonSelector);
    this._inactiveButtonClass = selectors.inactiveButtonClass;
    this._inputErrorClass = selectors.inputErrorClass;
    this._errorClass = selectors.errorClass;
    this._errorFieldList = Array.from(this._form.querySelectorAll(this._errorClass));
  }

  enableValidation() {
    this._addEventListeners();
  }

  _addEventListeners() {
    this._form.addEventListener('submit', (evt) => evt.preventDefault());
    this._setEventListeners();
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

  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError (inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${this._errorClass}_active`);
  }

  _hideInputError (inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(`${this._errorClass}_active`);
    errorElement.textContent = '';
  }

  _toggleButtonState () {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this.enableButton();
    }
  }

  resetError() {
    this._inputList.forEach(inputElement => this._hideInputError(inputElement));
  }

  disableButton () {
    this._button.classList.add(this._inactiveButtonClass);
    this._button.setAttribute("disabled", "");
  }

  enableButton () {
    this._button.classList.remove(this._inactiveButtonClass);
    this._button.removeAttribute("disabled", "");
  }

  _hasInvalidInput () {
    return this._inputList.some((input) => !input.validity.valid);
  }
}

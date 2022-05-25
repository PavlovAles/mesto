export default class FormValidator {
  constructor(selectors, form) {
    this._form = form;
    this._fieldsetSelector = selectors.fieldsetSelector;
    this._inputSelector = selectors.inputSelector;
    this._submitButtonSelector = selectors.submitButtonSelector;
    this._inactiveButtonClass = selectors.inactiveButtonClass;
    this._inputErrorClass = selectors.inputErrorClass;
    this._errorClass = selectors.errorClass;
  }

  enableValidation() {
    this._addEventListeners();
  }

  _addEventListeners() {
    this._form.addEventListener('submit', (evt) => evt.preventDefault());
    const fieldsetList = Array.from(this._form.querySelectorAll(this._fieldsetSelector));
    fieldsetList.forEach((fieldset) => this._setEventListeners(fieldset));
  }

  _setEventListeners(fieldset) {
    const inputList = Array.from(fieldset.querySelectorAll(this._inputSelector));
    const button = fieldset.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, button);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(fieldset, inputElement);
        this._toggleButtonState(inputList, button);
      });
    });
  }

  _checkInputValidity (fieldset, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(fieldset, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(fieldset, inputElement);
    }
  }

  _showInputError (fieldset, inputElement, errorMessage) {
    const errorElement = fieldset.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError (fieldset, inputElement) {
    const errorElement = fieldset.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _toggleButtonState (inputList, button) {
    if (this._hasInvalidInput(inputList)) {
      this.disableButton(button);
    } else {
      this.enableButton(button);
    }
  }

  disableButton (button) {
    button.classList.add(this._inactiveButtonClass);
    button.setAttribute("disabled", "");
  }

  enableButton (button) {
    button.classList.remove(this._inactiveButtonClass);
    button.removeAttribute("disabled", "");
  }

  _hasInvalidInput (inputList) {
    return inputList.some((input) => !input.validity.valid);
  }
}

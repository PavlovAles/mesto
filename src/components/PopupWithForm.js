import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor( { submitHandler }, popupSelector, submitButtonSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._popup.querySelector(submitButtonSelector);
    this._submitHandler = submitHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
    });
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__form-item');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  showSavingState(saving, defaultText) {
    saving ?
      this._submitButton.textContent = 'Сохранение...' :
      this._submitButton.textContent = defaultText;
  }
}

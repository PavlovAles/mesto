import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor( { submitHandler }, popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._submitHandler = submitHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitHandler.bind(this));
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__form-item');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
  }

  close() {
    super.close();
    this._form.reset();
  }
}
